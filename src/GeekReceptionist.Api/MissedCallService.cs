using System.Collections.Concurrent;

namespace GeekReceptionist.Api;

public enum MissedCallOutcome
{
    Texted,
    SkippedRecentlyTexted,
    SkippedNoCallerId,
    TextFailed,
}

/// <summary>
/// What happens when a call is missed: text the caller (at most once per window) and
/// tell the owner. State is in-memory on purpose: this service is stateless until call
/// history moves to the geek_voice schema via GeekAPI.
/// </summary>
public sealed class MissedCallService(
    ISmsSender sms,
    ReceptionistOptions options,
    TimeProvider clock,
    ILogger<MissedCallService> log)
{
    private readonly ConcurrentDictionary<string, DateTimeOffset> _lastTexted = new();
    private readonly ConcurrentDictionary<string, DateTimeOffset> _acceptedCalls = new();

    /// <summary>Records that the owner pressed a key to take the call (screening).</summary>
    public void MarkAccepted(string parentCallSid)
    {
        _acceptedCalls[parentCallSid] = clock.GetUtcNow();
        Prune(_acceptedCalls, TimeSpan.FromHours(1));
    }

    /// <summary>True (once) if the owner accepted this call via screening.</summary>
    public bool ConsumeAccepted(string callSid) => _acceptedCalls.TryRemove(callSid, out _);

    public async Task<MissedCallOutcome> HandleMissedCallAsync(string callSid, string? caller, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(caller) || !caller.StartsWith('+'))
        {
            // Blocked / anonymous caller IDs come through as "Anonymous" or similar: nothing to text.
            log.LogWarning("Missed call {CallSid} has no usable caller ID ({Caller}); owner notified only", callSid, caller);
            await NotifyOwnerAsync($"{options.CompanyName}: missed call from a blocked number. No text could be sent.", ct);
            return MissedCallOutcome.SkippedNoCallerId;
        }

        var now = clock.GetUtcNow();
        if (_lastTexted.TryGetValue(caller, out var last) && now - last < options.RepeatTextWindow)
        {
            log.LogInformation("Missed call {CallSid} from {Caller}: already texted at {Last}, not texting again", callSid, caller, last);
            await NotifyOwnerAsync($"{options.CompanyName}: {caller} called again (already texted).", ct);
            return MissedCallOutcome.SkippedRecentlyTexted;
        }

        var result = await sms.SendAsync(caller, options.CallerText, ct);
        if (!result.Sent)
        {
            await NotifyOwnerAsync($"{options.CompanyName}: missed call from {caller}. Auto-text FAILED ({result.Error}). Call them back.", ct);
            return MissedCallOutcome.TextFailed;
        }

        _lastTexted[caller] = now;
        Prune(_lastTexted, options.RepeatTextWindow);
        log.LogInformation("Missed call {CallSid} from {Caller}: texted ({MessageSid})", callSid, caller, result.MessageSid);
        await NotifyOwnerAsync($"{options.CompanyName}: missed call from {caller}. Auto-text sent.", ct);
        return MissedCallOutcome.Texted;
    }

    public Task NotifyVoicemailAsync(string? caller, string recordingUrl, string? durationSeconds, CancellationToken ct) =>
        NotifyOwnerAsync($"{options.CompanyName}: voicemail from {caller ?? "unknown"} ({durationSeconds ?? "?"}s): {recordingUrl}", ct);

    private async Task NotifyOwnerAsync(string body, CancellationToken ct)
    {
        var result = await sms.SendAsync(options.OwnerCell, body, ct);
        if (!result.Sent)
            log.LogError("Owner notification failed: {Error}", result.Error);
    }

    private void Prune(ConcurrentDictionary<string, DateTimeOffset> map, TimeSpan maxAge)
    {
        var cutoff = clock.GetUtcNow() - maxAge;
        foreach (var (key, at) in map)
            if (at < cutoff) map.TryRemove(key, out _);
    }
}
