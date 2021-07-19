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
    [Authorize]
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;

        public QuestionsController(IQuestionService questionService, IMapper mapper)
        {
            _questionService = questionService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByQuestionnaireId(int id)
        {
            var questions = await _questionService.GetByQuestionnaireIdAsync(id);
            var questionsDto = _mapper.Map<List<QuestionDto>>(questions);

            return Ok(questionsDto);
        }
    }
}