using System.Collections.Generic;

namespace FastLearner.Domain.DtoModels
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public QuestionnaireDto Questionnaire { get; set; }
        public IList<AnswerDto> Answers { get; set; }
    }
}
