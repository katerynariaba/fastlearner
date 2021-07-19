using FastLearner.Domain.Helpers;
using FastLearner.Domain.Services.Abstract;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class MailService : IMailService, IDisposable
    {
        private readonly SmtpClient _client;
        private readonly AppSettings _appSettings;

        public MailService(IOptions<AppSettings> appSettings)
        {
            _client = new SmtpClient();
            _appSettings = appSettings.Value;
        }

        public async Task SendEmailConfirmation(string code, string email)
        {
            var message = BuildMessage(email, "FastLearner - Email confirmation");

            var link = $"http://localhost:58285/users/confirm={code}";
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $"<p>To confirm your email please click the <a href='{link}'>link.</a></p>";

            message.Body = bodyBuilder.ToMessageBody();

            await _client.ConnectAsync("smtp.gmail.com", 465, true);

            await _client.AuthenticateAsync(_appSettings.EmailData.Address,
                _appSettings.EmailData.Password);

            await _client.SendAsync(message);
            await _client.DisconnectAsync(true);
        }

        private MimeMessage BuildMessage(string email, string subject)
        {
            var message = new MimeMessage();

            var from = new MailboxAddress("FastLearner", _appSettings.EmailData.Address);
            message.From.Add(from);

            var to = new MailboxAddress("Name", email);
            message.To.Add(to);

            message.Subject = subject;

            return message;
        }

        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}
