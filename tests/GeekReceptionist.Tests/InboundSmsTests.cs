using System.Net;

namespace GeekReceptionist.Tests;

public class InboundSmsTests
{
    private static Dictionary<string, string> Text(string body, string from = Settings.Caller, params string[] mediaUrls)
    {
        var form = new Dictionary<string, string>
        {
            ["MessageSid"] = "SM1",
            ["From"] = from,
            ["To"] = Settings.TwilioNumber,
            ["Body"] = body,
            ["NumMedia"] = mediaUrls.Length.ToString(),
        };
        for (var i = 0; i < mediaUrls.Length; i++) form[$"MediaUrl{i}"] = mediaUrls[i];
        return form;
    }

    [Fact]
    public async Task Reply_text_is_forwarded_to_owner_with_no_auto_reply()
    {
        using var app = new App();
        var (status, xml) = await app.PostTwilio("/twilio/sms/incoming", Text("Leak under the kitchen sink, 123 Main St"));

        Assert.Equal(HttpStatusCode.OK, status);
        Assert.DoesNotContain("<Message", xml);
        var owner = Assert.Single(app.Sms.To(Settings.Owner));
        Assert.Equal($"Dag Plumbing: text from {Settings.Caller}: Leak under the kitchen sink, 123 Main St", owner.Body);
        Assert.Empty(app.Sms.To(Settings.Caller));
    }

    [Fact]
    public async Task Attachments_are_deleted_and_never_forwarded()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/sms/incoming", Text("photo of the leak",
            mediaUrls: ["https://api.twilio.com/2010-04-01/Accounts/ACtest/Messages/SM1/Media/ME111",
                        "https://api.twilio.com/2010-04-01/Accounts/ACtest/Messages/SM1/Media/ME222"]));

        Assert.Equal(2, app.Media.Deleted.Count);
        var owner = Assert.Single(app.Sms.To(Settings.Owner));
        Assert.Contains("[2 attachment(s) not forwarded]", owner.Body);
        Assert.DoesNotContain("ME111", owner.Body);
        Assert.DoesNotContain("https://", owner.Body);
    }

    [Fact]
    public async Task Image_only_message_is_reported_without_content()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/sms/incoming", Text("", mediaUrls: ["https://api.twilio.com/x/Messages/SM1/Media/ME1"]));

        Assert.Single(app.Media.Deleted);
        Assert.Contains("(no text) [1 attachment(s) not forwarded]", Assert.Single(app.Sms.To(Settings.Owner)).Body);
    }

    [Fact]
    public async Task Long_messages_are_truncated()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/sms/incoming", Text(new string('x', 2000)));

        var owner = Assert.Single(app.Sms.To(Settings.Owner));
        Assert.True(owner.Body.Length < 700);
        Assert.EndsWith("…", owner.Body);
    }

    [Fact]
    public async Task Owners_own_texts_are_not_echoed_back()
    {
        using var app = new App();
        await app.PostTwilio("/twilio/sms/incoming", Text("testing", from: Settings.Owner));

        Assert.Empty(app.Sms.Sent);
    }

    [Fact]
    public async Task Unsigned_text_webhook_is_rejected()
    {
        using var app = new App();
        var (status, _) = await app.PostTwilio("/twilio/sms/incoming", Text("hi"), sign: false);

        Assert.Equal(HttpStatusCode.Forbidden, status);
        Assert.Empty(app.Sms.Sent);
    }
}
