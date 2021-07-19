using AutoMapper;
using FastLearner.Db.Db;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Helpers;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class AuthService : IAuthService
    {
        private readonly AppSettings _appSettings;

        private FastLearnerDbContext _context;
        private readonly IMapper _mapper;

        public AuthService(FastLearnerDbContext context, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public async Task<UserDto> AuthenticateAsync(string email, string password)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());

            if (user == null)
                return null;

            var hashedPassword = HashingHelper.VerifyHashedPassword(user.Password, password);

            if (!hashedPassword)
                return null;

            var userDto = _mapper.Map<UserDto>(user);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userDto.Id.ToString()),
                    new Claim(ClaimTypes.Role, ((int)userDto.Role).ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), 
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            userDto.Token = tokenHandler.WriteToken(token);

            return userDto;
        }
    }
}
