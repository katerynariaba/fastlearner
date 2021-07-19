using FastLearner.Domain.Models;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody]AuthModel model)
        {
            var user = await _authService.AuthenticateAsync(model.Email, model.Password);
            if (user == null)
                return BadRequest(new { message = "Login or password is incorrect" });

            if (user.IsEmailConfirmed == false)
                return BadRequest(new { message = "Email is not confirmed" });

            return Ok(user);
        }
    }
}