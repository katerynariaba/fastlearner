using AutoMapper;
using FastLearner.Api.Extensions;
using FastLearner.Domain.Converters;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IMapper _mapper;

        public CoursesController(ICourseService courseService, IMapper mapper)
        {
            _courseService = courseService;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] int? category = null)
        {
            var courses = category.HasValue ?
                await _courseService.GetByCategoryAsync(category) :
                await _courseService.GetAllAsync();

            var coursesDto = _mapper.Map<List<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("page/{page}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPaginated([FromRoute]int page)
        {
            var courses = await _courseService.GetPaginatedAsync(page);
            var coursesDto = _mapper.Map<List<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("popular")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPopular()
        {
            var courses = await _courseService.GetPopularAsync(3);
            var coursesDto = _mapper.Map<List<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("recommendations/{categoryId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRecommendations([FromRoute] int categoryId)
        {
            var courses = await _courseService.GetRecommendationsAsync(categoryId);
            var coursesDto = _mapper.Map<List<CourseDto>>(courses);

            return Ok(coursesDto);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetByUser()
        {
            var courses = await _courseService.GetByUserAsync(HttpContext.GetUserId());

            return Ok(courses);
        }


        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var course = await _courseService.GetByIdAsync(id);
            var courseDto = course.ToDto(HttpContext.GetUserId());

            return Ok(courseDto);
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            var courses = await _courseService.SearchAsync(search);
            var coursesDto = _mapper.Map<List<CourseDto>>(courses);
            return Ok(coursesDto);
        }

        [HttpPatch("{courseId}/subscribe")]
        public async Task<IActionResult> Subscribe([FromRoute] int courseId)
        {
            var userId = HttpContext.GetUserId();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _courseService.SubscribeAsync(courseId, userId);
            return Ok();
        }

        [HttpPatch("{courseId}/unsubscribe")]
        public async Task<IActionResult> Unsubscribe([FromRoute] int courseId)
        {
            var userId = HttpContext.GetUserId();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _courseService.UnsubscribeAsync(courseId, userId);
            return Ok();
        }
    }
}