using FastLearner.Db.DomainModels;
using FastLearner.Domain.Models;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IUserService
    {
        public Task<User> GetByIdAsync(int id);
        public Task<User> GetMeAsync(int id);
        public Task AddAsync(UserPostModel user, string confirmationCode);
        public Task<bool> ActivateIfValidAsync(string confirmationCode);
        public Task<bool> IsExistAsync(string email);
        public Task DeleteAccountAsync(int id);
        public Task UpdatePasswordAsync(PasswordPostModel password, int id);
        public Task UpdateAsync(User user, int id);
        public Task UpdateAvatarAsync(int id, string avatar);
    }
}
