using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IMailService
    {
        Task SendEmailConfirmation(string code, string email);
    }
}
