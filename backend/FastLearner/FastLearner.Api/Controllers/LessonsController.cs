using AutoMapper;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly ILessonService _lessonService;
        private readonly IMapper _mapper;

        public LessonsController(ILessonService lessonService, IMapper mapper)
        {
            _lessonService = lessonService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lesson = await _lessonService.GetByIdAsync(id);
            var lessonDto = _mapper.Map<LessonDto>(lesson);

            return Ok(lessonDto);

        }

        [HttpGet("course/{courseId}")]
        public async Task<IActionResult> GetByCourseId(int courseId)
        {
            var lessons = await _lessonService.GetByCourseIdAsync(courseId);
            var lessonsDto = _mapper.Map<List<LessonDto>>(lessons);

            return Ok(lessonsDto);
        }


    }
}