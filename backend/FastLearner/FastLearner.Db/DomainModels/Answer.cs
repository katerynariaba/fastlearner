using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FastLearner.Db.DomainModels
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
        [ForeignKey("QuestionId")]
        public virtual Question Question { get; set; }
    }
}
