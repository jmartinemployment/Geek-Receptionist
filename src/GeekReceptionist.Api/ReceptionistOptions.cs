namespace GeekReceptionist.Api;

/// <summary>How inbound calls reach this service.</summary>
public enum CallMode
{
    /// <summary>
    /// Callers dial the Twilio number. We ring the owner's cell; if nobody accepts,
    /// the caller is texted and offered voicemail. Used for demos and new numbers.
    /// </summary>
    Dial,

    /// <summary>
    /// The client's existing business line conditionally forwards unanswered calls
    /// to the Twilio number. Every call that arrives here is already a missed call.
    /// </summary>
    Forwarded,
}

/// <summary>
/// Runtime configuration, read from environment variables. Missing or invalid values
/// fail at startup — there are no silent defaults for anything that changes behavior.
/// </summary>
public sealed record ReceptionistOptions
{
    public required string TwilioAccountSid { get; init; }
    public required string TwilioAuthToken { get; init; }
    /// <summary>The Twilio number callers reach and texts are sent from (E.164).</summary>
    public required string TwilioNumber { get; init; }
    /// <summary>Owner's cell (E.164): rung in Dial mode, notified of every missed call.</summary>
    public required string OwnerCell { get; init; }
    public required string CompanyName { get; init; }
    /// <summary>Public https base URL Twilio calls (no trailing slash). Used for signature checks.</summary>
    public required string PublicBaseUrl { get; init; }
    public required CallMode Mode { get; init; }
    /// <summary>How long to ring the owner before treating the call as missed.</summary>
    public required int RingSeconds { get; init; }
    /// <summary>
    /// When true, the owner must press a key to accept the call. This stops the owner's own
    /// voicemail from "answering" and hiding a missed call.
    /// </summary>
    public required bool ScreenCalls { get; init; }
    /// <summary>Text sent to a caller who was missed. "{company}" is replaced.</summary>
    public required string CallerTextTemplate { get; init; }
    /// <summary>Do not text the same caller again within this window.</summary>
    public required TimeSpan RepeatTextWindow { get; init; }
    /// <summary>Reject requests without a valid X-Twilio-Signature. Only disable for local testing.</summary>
    public required bool ValidateTwilioSignature { get; init; }

    public const string DefaultCallerText =
        "Hi, this is {company}. Sorry we missed your call - we're on a job right now. " +
        "We'll call you back shortly. Feel free to reply here with what you need. Reply STOP to opt out.";

    public string CallerText => CallerTextTemplate.Replace("{company}", CompanyName, StringComparison.Ordinal);

    public static ReceptionistOptions FromConfiguration(IConfiguration config)
    {
        var errors = new List<string>();

        string Required(string key)
        {
            var value = config[key];
            if (string.IsNullOrWhiteSpace(value))
            {
                errors.Add($"{key} is required");
                return string.Empty;
            }
            return value.Trim();
        }

        string Phone(string key)
        {
            var value = Required(key);
            if (value.Length > 0 && !System.Text.RegularExpressions.Regex.IsMatch(value, @"^\+[1-9]\d{7,14}$"))
                errors.Add($"{key} must be E.164, e.g. +15615551234 (got '{value}')");
            return value;
        }

        var options = new ReceptionistOptions
        {
            TwilioAccountSid = Required("TWILIO_ACCOUNT_SID"),
            TwilioAuthToken = Required("TWILIO_AUTH_TOKEN"),
            TwilioNumber = Phone("TWILIO_NUMBER"),
            OwnerCell = Phone("OWNER_CELL"),
            CompanyName = Required("COMPANY_NAME"),
            PublicBaseUrl = ParseBaseUrl(Required("PUBLIC_BASE_URL"), errors),
            Mode = ParseEnum<CallMode>(config["CALL_MODE"] ?? "Dial", "CALL_MODE", errors),
            RingSeconds = ParseInt(config["RING_SECONDS"] ?? "18", "RING_SECONDS", 5, 60, errors),
            ScreenCalls = ParseBool(config["SCREEN_CALLS"] ?? "true", "SCREEN_CALLS", errors),
            CallerTextTemplate = string.IsNullOrWhiteSpace(config["CALLER_TEXT"]) ? DefaultCallerText : config["CALLER_TEXT"]!,
            RepeatTextWindow = TimeSpan.FromMinutes(ParseInt(config["REPEAT_TEXT_MINUTES"] ?? "10", "REPEAT_TEXT_MINUTES", 0, 1440, errors)),
            ValidateTwilioSignature = ParseBool(config["VALIDATE_TWILIO_SIGNATURE"] ?? "true", "VALIDATE_TWILIO_SIGNATURE", errors),
        };

        if (errors.Count > 0)
            throw new InvalidOperationException("Geek-Receptionist configuration is invalid:\n  - " + string.Join("\n  - ", errors));

        return options;
    }

    private static string ParseBaseUrl(string value, List<string> errors)
    {
        if (value.Length == 0) return value;
        if (!Uri.TryCreate(value, UriKind.Absolute, out var uri) || (uri.Scheme != "https" && uri.Scheme != "http"))
        {
            errors.Add($"PUBLIC_BASE_URL must be an absolute http(s) URL (got '{value}')");
            return value;
        }
        return value.TrimEnd('/');
    }

    private static T ParseEnum<T>(string value, string key, List<string> errors) where T : struct, Enum
    {
        if (Enum.TryParse<T>(value, ignoreCase: true, out var parsed) && Enum.IsDefined(parsed)) return parsed;
        errors.Add($"{key} must be one of {string.Join(", ", Enum.GetNames<T>())} (got '{value}')");
        return default;
    }

    private static int ParseInt(string value, string key, int min, int max, List<string> errors)
    {
        if (int.TryParse(value, out var n) && n >= min && n <= max) return n;
        errors.Add($"{key} must be an integer between {min} and {max} (got '{value}')");
        return min;
    }

    private static bool ParseBool(string value, string key, List<string> errors)
    {
        if (bool.TryParse(value, out var b)) return b;
        errors.Add($"{key} must be true or false (got '{value}')");
        return false;
    }
}
