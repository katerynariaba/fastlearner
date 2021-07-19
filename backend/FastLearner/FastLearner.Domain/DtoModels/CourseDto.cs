namespace FastLearner.Domain.DtoModels
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public int NumberOfStudents { get; set; }
        public string Language { get; set; }
        public string SkillLevel { get; set; }
        public float Duration { get; set; }
        public bool IsUserSubscribed { get; set; }
        public CategoryDto Category { get; set; }
    }

    public class CourseExtendedDto : CourseDto
    {
        public bool IsComleted { get; set; }
    }
}
