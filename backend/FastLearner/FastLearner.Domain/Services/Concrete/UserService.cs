using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Db.Enums;
using FastLearner.Domain.Helpers;
using FastLearner.Domain.Models;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class UserService : IUserService
    {
        private readonly FastLearnerDbContext _context;

        public UserService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(r => r.Courses)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<User> GetMeAsync(int id)
        {
            return await _context.Users
                .Include(r => r.Courses)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task AddAsync(UserPostModel user, string confirmationCode)
        {
            var dbUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = HashingHelper.HashPassword(user.Password),
                Login = user.Login,
                Role = UserRole.Student,
                IsEmailConfirmed = false,
                ConfirmationCode = confirmationCode
            };
            await _context.Users.AddAsync(dbUser);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ActivateIfValidAsync(string confirmationCode)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(r => r.ConfirmationCode == confirmationCode);

            if (user == null) return false;
            user.IsEmailConfirmed = true;
            user.ConfirmationCode = string.Empty;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsExistAsync(string email)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(r => r.Email == email);

            if (user == null) return false;

            return true;
        }

        public async Task DeleteAccountAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User newUser, int id)
        {
            var user = await _context.Users.FindAsync(id);
            user.FirstName = newUser.FirstName;
            user.LastName = newUser.LastName;
            user.Login = newUser.Login;
            user.Email = newUser.Email;
            user.FacebookUrl = newUser.FacebookUrl;
            user.TwitterUrl = newUser.TwitterUrl;
            user.LinkendinUrl = newUser.LinkendinUrl;
            user.InstagramUrl = newUser.InstagramUrl;

            await _context.SaveChangesAsync();
        }

        public async Task UpdatePasswordAsync(PasswordPostModel password, int id)
        {
            var user = await _context.Users.FindAsync(id);
            user.Password = HashingHelper.HashPassword(password.Password);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAvatarAsync(int id, string avatar)
        {
            var user = await _context.Users.FindAsync(id);
            user.Photo = avatar;
            await _context.SaveChangesAsync();
        }
    }
}
