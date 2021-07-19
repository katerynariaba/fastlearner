using AutoMapper;
using FastLearner.Api.Extensions;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Models;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;

        public UsersController(IUserService userService, IMapper mapper, IMailService mailService)
        {
            _userService = userService;
            _mapper = mapper;
            _mailService = mailService;
        }

        [HttpPost("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody]UserPostModel user)
        {
            if (!ModelState.IsValid) return BadRequest("The data is invalid");

            bool isExist = await _userService.IsExistAsync(user.Email);
            if (isExist) return BadRequest("User with this email address already exists");

            var g = Guid.NewGuid();
            var confirmationCode = g.ToString();

            await _userService.AddAsync(user, confirmationCode);

            await _mailService.SendEmailConfirmation(confirmationCode, user.Email);

            return Ok();
        }

        [HttpGet("confirm={code}")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string code)
        {
            if (string.IsNullOrEmpty(code)) return BadRequest();

            var valid = await _userService.ActivateIfValidAsync(code);

            var htmlResult = valid ?
                @"<h1>Your email has been successfully confirmed</h1><p>Now you can log in.</p><a href='http://localhost:3000/login'>Log in</a>"
                : @"<h1>The confirmation code is not valid</h1>";

            return Content(htmlResult, "text/html", Encoding.UTF8);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var user = await _userService.GetByIdAsync(HttpContext.GetUserId());
            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }

        [HttpPost]
        public async Task<IActionResult> Update(UserDto userDto)
        {
            if (!ModelState.IsValid) return BadRequest("The data is invalid");

            var user = _mapper.Map<User>(userDto);
            var userId = HttpContext.GetUserId();

            await _userService.UpdateAsync(user, userId);
            return Ok();
        }

        [HttpPost("password")]
        public async Task<IActionResult> UpdatePassword([FromBody]PasswordPostModel password)
        {
            var userId = HttpContext.GetUserId();

            await _userService.UpdatePasswordAsync(password, userId);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAccount()
        {
            await _userService.DeleteAccountAsync(HttpContext.GetUserId());
            return Ok();
        }

        [Route("avatar")]
        [HttpPost]
        public async Task<ActionResult> UpdateAvatar(IFormFile avatar)
        {
            var oldUserData = await _userService.GetByIdAsync(HttpContext.GetUserId());

            if (oldUserData == null)
            {
                return Unauthorized();
            }

            using (var ms = new MemoryStream())
            {
                avatar.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string base64Avatar = "data:image/jpeg;base64," + Convert.ToBase64String(fileBytes);

                await _userService.UpdateAvatarAsync(oldUserData.Id, base64Avatar);
            }

            return Ok();
        }
    }
}