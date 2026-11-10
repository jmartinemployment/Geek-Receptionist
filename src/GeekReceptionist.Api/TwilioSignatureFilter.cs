using Twilio.Security;

namespace GeekReceptionist.Api;

/// <summary>
/// Rejects any webhook that is not signed by Twilio with this account's auth token.
/// The signed URL is rebuilt from PUBLIC_BASE_URL because Railway terminates TLS at its
/// proxy, so the scheme/host seen by Kestrel differ from what Twilio requested.
/// </summary>
public sealed class TwilioSignatureFilter(ReceptionistOptions options, ILogger<TwilioSignatureFilter> log) : IEndpointFilter
{
    private readonly RequestValidator _validator = new(options.TwilioAuthToken);

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (!options.ValidateTwilioSignature)
            return await next(context);

        var request = context.HttpContext.Request;
        var signature = request.Headers["X-Twilio-Signature"].ToString();
        if (string.IsNullOrEmpty(signature) || !request.HasFormContentType)
        {
            log.LogWarning("Rejected {Path}: missing Twilio signature or form body", request.Path);
            return Results.StatusCode(StatusCodes.Status403Forbidden);
        }

        var form = await request.ReadFormAsync();
        var parameters = form.ToDictionary(kv => kv.Key, kv => kv.Value.ToString());
        var url = options.PublicBaseUrl + request.Path + request.QueryString;

        if (!_validator.Validate(url, parameters, signature))
        {
            log.LogWarning("Rejected {Path}: invalid Twilio signature for {Url}", request.Path, url);
            return Results.StatusCode(StatusCodes.Status403Forbidden);
        }

        return await next(context);
    }
}
