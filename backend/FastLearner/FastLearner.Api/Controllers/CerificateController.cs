using FastLearner.Api.Extensions;
using FastLearner.Db.Db;
using FastLearner.Domain.Helpers;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class CerificateController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IUserService _userService;
        public CerificateController(ICourseService courseService, IUserService userService)
        {
            _courseService = courseService;
            _userService = userService;
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetPdf(int courseId)
        {
            var user = await _userService.GetByIdAsync(HttpContext.GetUserId());
            var course = await _courseService.GetByIdAsync(courseId);

            var pdf = PdfHelper.GeneratePdf(course, user);

            return File(pdf, "application/pdf");
        }
    }
}