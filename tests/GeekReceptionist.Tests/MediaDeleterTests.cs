using GeekReceptionist.Api;
using Microsoft.Extensions.Logging;
using Twilio.Clients;

namespace GeekReceptionist.Tests;

public class MediaDeleterTests
{
    private sealed class ListLogger<T> : ILogger<T>
    {
        public List<(LogLevel Level, string Message)> Entries { get; } = new();
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
        public bool IsEnabled(LogLevel logLevel) => true;
        public void Log<TState>(LogLevel level, EventId id, TState state, Exception? ex, Func<TState, Exception?, string> fmt) =>
            Entries.Add((level, fmt(state, ex)));
    }

    [Theory]
    [InlineData("https://api.twilio.com/2010-04-01/Accounts/ACx/Messages/MMx/Media/not-a-media-sid")]
    [InlineData("https://example.com/")]
    [InlineData("")]
    public async Task Unexpected_media_url_is_logged_as_error_and_no_request_is_made(string url)
    {
        var log = new ListLogger<TwilioMediaDeleter>();
        // Credentials are never used: the format check returns before any call to Twilio.
        var deleter = new TwilioMediaDeleter(new TwilioRestClient("SKunused", "unused", accountSid: "ACunused"), log);

        await deleter.DeleteAsync("MM00000000000000000000000000000000", url, CancellationToken.None);

        var entry = Assert.Single(log.Entries);
        Assert.Equal(LogLevel.Error, entry.Level);
        Assert.Contains("unexpected media URL format", entry.Message);
    }
}
