using AutoMapper;
using FastLearner.Api.Extensions;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Models;
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
    public class QuestionnairesController : ControllerBase
    {
        private readonly IQuestionnaireService _questionnaireService;
        private readonly IResultService _resultService;
        private readonly IMapper _mapper;

        public QuestionnairesController(IQuestionnaireService questionnaireService, IResultService resultService, IMapper mapper)
        {
            _questionnaireService = questionnaireService;
            _resultService = resultService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var questionnaire = await _questionnaireService.GetByIdAsync(id);
            var questionnaireDto = _mapper.Map<QuestionnaireDto>(questionnaire);

            return Ok(questionnaireDto);
        }

        [AllowAnonymous]
        [HttpGet("{questionnaireId}/result")]
        public async Task<IActionResult> GetByUser(int questionnaireId)
        {
            var userId = HttpContext.GetUserId();

            var results = await _resultService.GetByUserAsync(userId, questionnaireId);
            var resultsDto = _mapper.Map<List<ResultDto>>(results);

            return Ok(resultsDto);
        }

        [HttpPost("{questionnaireId}/result")]
        public async Task<IActionResult> Add(int questionnaireId, CorrectAnswersPostModel answers)
        {
            var userId = HttpContext.GetUserId();

            await _resultService.AddAsync(answers, userId, questionnaireId);
            return Ok();
        }
    }
}