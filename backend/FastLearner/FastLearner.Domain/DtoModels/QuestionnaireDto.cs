using System.Collections.Generic;

namespace FastLearner.Domain.DtoModels
{
    public class QuestionnaireDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IList<LessonDto> Lessons { get; set; }
    }
}
