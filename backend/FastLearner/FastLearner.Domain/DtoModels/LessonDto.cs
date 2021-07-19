namespace FastLearner.Domain.DtoModels
{
    public class LessonDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoName { get; set; }
        public QuestionnaireDto Questionnaire { get; set; }
    }
}
