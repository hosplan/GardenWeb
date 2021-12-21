using GardenWeb.Models;
using MailKit.Security;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
//using System.Net.Mail; - 이걸 선언하면 모호한 참조가 되버려 오류
using System.Threading.Tasks;

namespace GardenWeb.HelperService
{
    public interface IMailService
    {
        Task<bool> SendEmailAsync(MailRequest mailRequest);
    }

    public class MailService : IMailService
    {
        private readonly MailSetting _mailSetting;

        public MailService(IOptions<MailSetting> mailSettings)
        {
            _mailSetting = mailSettings.Value;
        }

        public async Task<bool> SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse(_mailSetting.Mail);
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                email.Subject = mailRequest.Subject;
                var builder = new BodyBuilder();

                builder.HtmlBody = mailRequest.Body;
                email.Body = builder.ToMessageBody();

                using var smtp = new SmtpClient();

                smtp.Connect(_mailSetting.Host, _mailSetting.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_mailSetting.Mail, _mailSetting.Password);

                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                return true;
            }
            catch
            {
                return false;
            }
           
        }
    }
}
