using Twilio.Clients;
using Twilio.Exceptions;
using Twilio.Rest.Api.V2010.Account.Message;

namespace GeekReceptionist.Api;

public interface IMediaDeleter
{
    Task DeleteAsync(string messageSid, string mediaUrl, CancellationToken ct);
}

/// <summary>Deletes inbound MMS media from Twilio so it is never stored or passed along.</summary>
public sealed class TwilioMediaDeleter(ITwilioRestClient client, ILogger<TwilioMediaDeleter> log) : IMediaDeleter
{
    public async Task DeleteAsync(string messageSid, string mediaUrl, CancellationToken ct)
    {
        // Media URLs end in .../Messages/{MessageSid}/Media/{MediaSid}
        var mediaSid = mediaUrl.TrimEnd('/').Split('/')[^1];
        try
        {
            await MediaResource.DeleteAsync(pathMessageSid: messageSid, pathSid: mediaSid, client: client);
            log.LogInformation("Deleted inbound media {MediaSid} on {MessageSid}", mediaSid, messageSid);
        }
        catch (ApiException ex)
        {
            log.LogError(ex, "Failed to delete inbound media {MediaSid} on {MessageSid}: {Code}", mediaSid, messageSid, ex.Code);
        }
    }
}

/// <summary>
/// Texts sent to the business number are forwarded to the owner as plain text only.
/// Attachments (images, video, files) are deleted from Twilio and never forwarded:
/// the service only ever moves words, never media.
/// </summary>
public sealed class InboundSmsService(
    ISmsSender sms,
    IMediaDeleter media,
    ReceptionistOptions options,
    ILogger<InboundSmsService> log)
{
    public const int MaxForwardedChars = 600;

    public async Task HandleAsync(IFormCollection form, CancellationToken ct)
    {
        var from = form["From"].ToString();
        var messageSid = form["MessageSid"].ToString();
        var body = form["Body"].ToString().Trim();
        _ = int.TryParse(form["NumMedia"], out var mediaCount);

        for (var i = 0; i < mediaCount; i++)
        {
            var url = form[$"MediaUrl{i}"].ToString();
            if (url.Length > 0) await media.DeleteAsync(messageSid, url, ct);
        }

        if (from == options.OwnerCell)
        {
            log.LogInformation("Ignoring text from the owner's own number ({MessageSid})", messageSid);
            return;
        }

        if (body.Length > MaxForwardedChars) body = body[..MaxForwardedChars] + "…";

        var forwarded = $"{options.CompanyName}: text from {from}: " + (body.Length > 0 ? body : "(no text)");
        if (mediaCount > 0)
            forwarded += $" [{mediaCount} attachment(s) not forwarded]";

        var result = await sms.SendAsync(options.OwnerCell, forwarded, ct);
        if (!result.Sent)
            log.LogError("Failed to forward text {MessageSid} from {From} to owner: {Error}", messageSid, from, result.Error);
        else
            log.LogInformation("Forwarded text {MessageSid} from {From} to owner", messageSid, from);
    }
}
