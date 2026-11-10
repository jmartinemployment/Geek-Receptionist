using System.Collections.Concurrent;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using GeekReceptionist.Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace GeekReceptionist.Tests;

public sealed class FakeSms : ISmsSender
{
    public ConcurrentQueue<(string To, string Body)> Sent { get; } = new();
    public bool Fail { get; set; }

    public Task<SmsResult> SendAsync(string to, string body, CancellationToken ct)
    {
        if (Fail && to != Settings.Owner)
            return Task.FromResult(new SmsResult(false, null, "Twilio 30034: unregistered number"));
        Sent.Enqueue((to, body));
        return Task.FromResult(new SmsResult(true, "SM" + Guid.NewGuid().ToString("N"), null));
    }

    public List<(string To, string Body)> To(string number) => Sent.Where(m => m.To == number).ToList();
}

public static class Settings
{
    public const string Token = "test-auth-token";
    public const string Base = "https://receptionist.example.com";
    public const string Owner = "+15615550100";
    public const string TwilioNumber = "+15615550199";
    public const string Caller = "+15615551234";
}

public sealed class App(Dictionary<string, string?>? overrides = null) : WebApplicationFactory<Program>
{
    public FakeSms Sms { get; } = new();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var settings = new Dictionary<string, string?>
        {
            ["TWILIO_ACCOUNT_SID"] = "ACtest",
            ["TWILIO_AUTH_TOKEN"] = Settings.Token,
            ["TWILIO_NUMBER"] = Settings.TwilioNumber,
            ["OWNER_CELL"] = Settings.Owner,
            ["COMPANY_NAME"] = "Dag Plumbing",
            ["PUBLIC_BASE_URL"] = Settings.Base,
            ["CALL_MODE"] = "Dial",
            ["SCREEN_CALLS"] = "true",
        };
        foreach (var (k, v) in overrides ?? new()) settings[k] = v;
        foreach (var (k, v) in settings) builder.UseSetting(k, v);

        builder.ConfigureServices(s => s.Replace(ServiceDescriptor.Singleton<ISmsSender>(Sms)));
    }

    /// <summary>POSTs a form signed exactly the way Twilio signs webhooks.</summary>
    public async Task<(HttpStatusCode Status, string Body)> PostTwilio(string pathAndQuery, Dictionary<string, string> form, bool sign = true)
    {
        var client = CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Post, pathAndQuery) { Content = new FormUrlEncodedContent(form) };
        if (sign) request.Headers.Add("X-Twilio-Signature", Sign(Settings.Base + pathAndQuery, form));
        var response = await client.SendAsync(request);
        return (response.StatusCode, await response.Content.ReadAsStringAsync());
    }

    private static string Sign(string url, Dictionary<string, string> form)
    {
        var data = new StringBuilder(url);
        foreach (var key in form.Keys.OrderBy(k => k, StringComparer.Ordinal)) data.Append(key).Append(form[key]);
        using var hmac = new HMACSHA1(Encoding.UTF8.GetBytes(Settings.Token));
        return Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(data.ToString())));
    }
}

public class VoiceWebhookTests
{
    private static Dictionary<string, string> Call(string sid = "CA1", string from = Settings.Caller, string? dialStatus = null)
    {
        var form = new Dictionary<string, string> { ["CallSid"] = sid, ["From"] = from, ["To"] = Settings.TwilioNumber };
        if (dialStatus is not null) form["DialCallStatus"] = dialStatus;
        return form;
    }

    [Fact]
    public async Task Incoming_call_rings_owner_with_screening_and_timeout()
    {
        using var app = new App();
        var (status, xml) = await app.PostTwilio("/twilio/voice/incoming", Call());

        Assert.Equal(HttpStatusCode.OK, status);
        Assert.Contains("<Dial", xml);
        Assert.Contains("timeout=\"18\"", xml);
        Assert.Contains($"{Settings.Base}/twilio/voice/dial-complete", xml);
        Assert.Contains(Settings.Owner, xml);
        Assert.Contains("/twilio/voice/screen?parent=CA1", xml);
        Assert.Empty(app.Sms.Sent);
    }

    [Fact]
    public async Task Unanswered_call_texts_caller_notifies_owner_and_offers_voicemail()
    {
        using var app = new App();
        var (_, xml) = await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "no-answer"));

        var callerText = Assert.Single(app.Sms.To(Settings.Caller));
        Assert.StartsWith("Hi, this is Dag Plumbing.", callerText.Body);
        Assert.Contains("Auto-text sent", Assert.Single(app.Sms.To(Settings.Owner)).Body);
        Assert.Contains("<Record", xml);
        Assert.Contains("/twilio/voice/voicemail-complete", xml);
    }

    [Fact]
    public async Task Owner_voicemail_picking_up_still_counts_as_missed_when_screening()
    {
        // Carrier voicemail "answers" → DialCallStatus completed, but nobody pressed a key.
        using var app = new App();
        await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "completed"));

        Assert.Single(app.Sms.To(Settings.Caller));
    }

    [Fact]
    public async Task Owner_accepting_the_call_sends_no_text()
    {
        using var app = new App();
        var (screenStatus, screenXml) = await app.PostTwilio("/twilio/voice/screen?parent=CA1", Call("CAchild"));
        Assert.Equal(HttpStatusCode.OK, screenStatus);
        Assert.Contains("<Gather", screenXml);
        Assert.Contains("Call for Dag Plumbing", screenXml);

        await app.PostTwilio("/twilio/voice/screen-accepted?parent=CA1", new() { ["CallSid"] = "CAchild", ["Digits"] = "1" });
        var (_, xml) = await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "completed"));

        Assert.Empty(app.Sms.Sent);
        Assert.Contains("<Hangup", xml);
    }

    [Fact]
    public async Task Without_screening_completed_dial_counts_as_answered()
    {
        using var app = new App(new() { ["SCREEN_CALLS"] = "false" });
        var (_, incoming) = await app.PostTwilio("/twilio/voice/incoming", Call());
        Assert.DoesNotContain("/screen", incoming);

        await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "completed"));
        Assert.Empty(app.Sms.Sent);

        await app.PostTwilio("/twilio/voice/dial-complete", Call("CA2", dialStatus: "busy"));
        Assert.Single(app.Sms.To(Settings.Caller));
    }

    [Fact]
    public async Task Repeat_caller_is_texted_only_once_within_window()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/voice/dial-complete", Call("CA1", dialStatus: "no-answer"));
        await app.PostTwilio("/twilio/voice/dial-complete", Call("CA2", dialStatus: "no-answer"));

        Assert.Single(app.Sms.To(Settings.Caller));
        Assert.Contains(app.Sms.To(Settings.Owner), m => m.Body.Contains("called again"));
    }

    [Fact]
    public async Task Forwarded_mode_texts_immediately_without_ringing_owner()
    {
        using var app = new App(new() { ["CALL_MODE"] = "Forwarded" });
        var (_, xml) = await app.PostTwilio("/twilio/voice/incoming", Call());

        Assert.DoesNotContain("<Dial", xml);
        Assert.Contains("<Record", xml);
        Assert.Single(app.Sms.To(Settings.Caller));
    }

    [Fact]
    public async Task Blocked_caller_id_notifies_owner_only()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/voice/dial-complete", Call(from: "Anonymous", dialStatus: "no-answer"));

        Assert.Empty(app.Sms.To("Anonymous"));
        Assert.Contains("blocked number", Assert.Single(app.Sms.To(Settings.Owner)).Body);
    }

    [Fact]
    public async Task International_caller_is_not_texted()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/voice/dial-complete", Call(from: "+447700900123", dialStatus: "no-answer"));

        Assert.Empty(app.Sms.To("+447700900123"));
        Assert.Contains("international", Assert.Single(app.Sms.To(Settings.Owner)).Body);
    }

    [Fact]
    public async Task Failed_text_is_reported_to_owner_not_hidden()
    {
        using var app = new App();
        app.Sms.Fail = true;
        await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "no-answer"));

        var owner = Assert.Single(app.Sms.To(Settings.Owner));
        Assert.Contains("FAILED", owner.Body);
        Assert.Contains("30034", owner.Body);
    }

    [Fact]
    public async Task Voicemail_link_is_sent_to_owner()
    {
        using var app = new App();
        var form = Call();
        form["RecordingUrl"] = "https://api.twilio.com/recordings/RE1";
        form["RecordingDuration"] = "14";
        await app.PostTwilio("/twilio/voice/voicemail-complete", form);

        var owner = Assert.Single(app.Sms.To(Settings.Owner));
        Assert.Contains("RE1", owner.Body);
        Assert.Contains("14s", owner.Body);
    }

    [Fact]
    public async Task Unsigned_or_forged_requests_are_rejected()
    {
        using var app = new App();
        var (unsigned, _) = await app.PostTwilio("/twilio/voice/dial-complete", Call(dialStatus: "no-answer"), sign: false);
        Assert.Equal(HttpStatusCode.Forbidden, unsigned);

        var client = app.CreateClient();
        using var forged = new HttpRequestMessage(HttpMethod.Post, "/twilio/voice/dial-complete")
        { Content = new FormUrlEncodedContent(Call(dialStatus: "no-answer")) };
        forged.Headers.Add("X-Twilio-Signature", "bm90LWEtcmVhbC1zaWduYXR1cmU=");
        Assert.Equal(HttpStatusCode.Forbidden, (await client.SendAsync(forged)).StatusCode);

        Assert.Empty(app.Sms.Sent);
    }

    [Fact]
    public async Task Health_is_public()
    {
        using var app = new App();
        var response = await app.CreateClient().GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public void Missing_configuration_fails_at_startup_with_every_problem_listed()
    {
        using var app = new App(new() { ["OWNER_CELL"] = "561-555-0100", ["COMPANY_NAME"] = "", ["CALL_MODE"] = "Sometimes" });
        var ex = Assert.ThrowsAny<Exception>(() => app.CreateClient());
        var message = ex.ToString();
        Assert.Contains("OWNER_CELL must be E.164", message);
        Assert.Contains("COMPANY_NAME is required", message);
        Assert.Contains("CALL_MODE must be one of", message);
    }
}
