using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FastLearner.Db.DomainModels
{
    public class Lesson
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoName { get; set; }

        [ForeignKey("QuestionnaireId")]
        public virtual Questionnaire Questionnaire { get; set; }
        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }
    }
}
