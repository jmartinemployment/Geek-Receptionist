using Twilio.Clients;
using Twilio.Exceptions;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace GeekReceptionist.Api;

public sealed record SmsResult(bool Sent, string? MessageSid, string? Error);

public interface ISmsSender
{
    Task<SmsResult> SendAsync(string to, string body, CancellationToken ct);
}

/// <summary>Sends SMS through Twilio's Messages API from the configured Twilio number.</summary>
public sealed class TwilioSmsSender(ITwilioRestClient client, ReceptionistOptions options, ILogger<TwilioSmsSender> log) : ISmsSender
{
    public async Task<SmsResult> SendAsync(string to, string body, CancellationToken ct)
    {
        try
        {
            var message = await MessageResource.CreateAsync(
                to: new PhoneNumber(to),
                from: new PhoneNumber(options.TwilioNumber),
                body: body,
                client: client);
            log.LogInformation("SMS queued {MessageSid} to {To} status {Status}", message.Sid, to, message.Status);
            return new SmsResult(true, message.Sid, null);
        }
        catch (ApiException ex)
        {
            // Common causes: unregistered A2P 10DLC number (30034), landline recipient (21614),
            // trial account sending to an unverified number (21608). Logged at Error so it is visible.
            log.LogError(ex, "Twilio rejected SMS to {To}: code {Code} {Message}", to, ex.Code, ex.Message);
            return new SmsResult(false, null, $"Twilio {ex.Code}: {ex.Message}");
        }
    }
}
