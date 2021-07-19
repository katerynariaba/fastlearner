using FastLearner.Domain.DtoModels;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IAuthService
    {
        public Task<UserDto> AuthenticateAsync(string email, string password);
    }
}
