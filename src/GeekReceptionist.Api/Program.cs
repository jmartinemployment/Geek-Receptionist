using GeekReceptionist.Api;
using Twilio.Clients;
using HttpMethod = Twilio.Http.HttpMethod;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using Twilio.Types;

var builder = WebApplication.CreateBuilder(args);

// Railway injects PORT; bind to it on all interfaces.
if (Environment.GetEnvironmentVariable("PORT") is { Length: > 0 } port)
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

builder.Services.AddSingleton(sp => ReceptionistOptions.FromConfiguration(sp.GetRequiredService<IConfiguration>()));
builder.Services.AddSingleton<ITwilioRestClient>(sp =>
{
    var o = sp.GetRequiredService<ReceptionistOptions>();
    // Outbound REST calls authenticate with the API key, scoped to the account (or client subaccount).
    // The auth token is reserved for verifying inbound webhook signatures.
    return new TwilioRestClient(o.TwilioApiKeySid, o.TwilioApiKeySecret, accountSid: o.TwilioAccountSid);
});
builder.Services.AddSingleton<ISmsSender, TwilioSmsSender>();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddSingleton<MissedCallService>();
builder.Services.AddSingleton<IMediaDeleter, TwilioMediaDeleter>();
builder.Services.AddSingleton<InboundSmsService>();
builder.Services.AddSingleton<TwilioSignatureFilter>();

var app = builder.Build();

// Fail loud at startup if configuration is incomplete, not on the first phone call.
var options = app.Services.GetRequiredService<ReceptionistOptions>();
app.Logger.LogInformation(
    "Geek-Receptionist starting for {Company}: mode {Mode}, ring {Ring}s, screening {Screen}, signature check {Sig}",
    options.CompanyName, options.Mode, options.RingSeconds, options.ScreenCalls, options.ValidateTwilioSignature);

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

var voice = app.MapGroup("/twilio/voice").AddEndpointFilter<TwilioSignatureFilter>();

// 1. A call arrives at the Twilio number.
voice.MapPost("/incoming", async (HttpRequest req, ReceptionistOptions o, MissedCallService missed, CancellationToken ct) =>
{
    var form = await req.ReadFormAsync(ct);
    var callSid = form["CallSid"].ToString();

    if (o.Mode == CallMode.Forwarded)
    {
        // The client's own line already rang and went unanswered before forwarding here.
        await missed.HandleMissedCallAsync(callSid, form["From"], ct);
        return Twiml(VoicemailPrompt(o));
    }

    var response = new VoiceResponse();
    var dial = new Dial(
        action: Url(o, "/twilio/voice/dial-complete"),
        method: HttpMethod.Post,
        timeout: o.RingSeconds);
    dial.Number(
        phoneNumber: new PhoneNumber(o.OwnerCell),
        url: o.ScreenCalls ? Url(o, $"/twilio/voice/screen?parent={Uri.EscapeDataString(callSid)}") : null,
        method: o.ScreenCalls ? HttpMethod.Post : null);
    response.Append(dial);
    return Twiml(response);
});

// 2. (Screening) Played to the owner when they pick up, before the caller is connected.
voice.MapPost("/screen", (string parent, ReceptionistOptions o) =>
{
    var response = new VoiceResponse();
    var gather = new Gather(
        numDigits: 1,
        timeout: 6,
        action: Url(o, $"/twilio/voice/screen-accepted?parent={Uri.EscapeDataString(parent)}"),
        method: HttpMethod.Post);
    gather.Say($"Call for {o.CompanyName}. Press any key to accept.");
    response.Append(gather);
    // No key pressed (e.g. the owner's voicemail answered): drop this leg so the call counts as missed.
    response.Hangup();
    return Twiml(response);
});

// 3. (Screening) Owner pressed a key: mark accepted; empty TwiML connects the two legs.
voice.MapPost("/screen-accepted", (string parent, MissedCallService missed) =>
{
    missed.MarkAccepted(parent);
    return Twiml(new VoiceResponse());
});

// 4. The <Dial> to the owner finished. Decide whether the call was missed.
voice.MapPost("/dial-complete", async (HttpRequest req, ReceptionistOptions o, MissedCallService missed, ILogger<Program> log, CancellationToken ct) =>
{
    var form = await req.ReadFormAsync(ct);
    var callSid = form["CallSid"].ToString();
    var dialStatus = form["DialCallStatus"].ToString();

    var answered = o.ScreenCalls
        ? missed.ConsumeAccepted(callSid)
        : dialStatus is "completed" or "answered";

    log.LogInformation("Call {CallSid} dial status {Status}; answered by owner: {Answered}", callSid, dialStatus, answered);

    if (answered)
    {
        var done = new VoiceResponse();
        done.Hangup();
        return Twiml(done);
    }

    await missed.HandleMissedCallAsync(callSid, form["From"], ct);
    return Twiml(VoicemailPrompt(o));
});

// 5. Voicemail recorded: send the owner the recording link.
voice.MapPost("/voicemail-complete", async (HttpRequest req, MissedCallService missed, CancellationToken ct) =>
{
    var form = await req.ReadFormAsync(ct);
    var url = form["RecordingUrl"].ToString();
    if (!string.IsNullOrEmpty(url) && form["RecordingDuration"].ToString() is var duration && duration != "0")
        await missed.NotifyVoicemailAsync(form["From"], url, duration, ct);

    var response = new VoiceResponse();
    response.Say("Thank you. Goodbye.");
    response.Hangup();
    return Twiml(response);
});

// 6. A text arrives at the business number (usually a reply to the missed-call text).
app.MapPost("/twilio/sms/incoming", async (HttpRequest req, InboundSmsService inbound, CancellationToken ct) =>
{
    await inbound.HandleAsync(await req.ReadFormAsync(ct), ct);
    // Empty response: no automatic reply. Twilio itself handles STOP/HELP keywords.
    return Results.Content(new Twilio.TwiML.MessagingResponse().ToString(), "application/xml");
}).AddEndpointFilter<TwilioSignatureFilter>();

app.Run();

static VoiceResponse VoicemailPrompt(ReceptionistOptions o)
{
    var response = new VoiceResponse();
    response.Say($"Sorry we missed you. {o.CompanyName} just sent you a text message. You can also leave a message after the tone.");
    response.Record(
        action: Url(o, "/twilio/voice/voicemail-complete"),
        method: HttpMethod.Post,
        maxLength: 120,
        playBeep: true,
        finishOnKey: "#");
    return response;
}

static Uri Url(ReceptionistOptions o, string pathAndQuery) => new(o.PublicBaseUrl + pathAndQuery);

static IResult Twiml(VoiceResponse response) => Results.Content(response.ToString(), "application/xml");

public partial class Program;
