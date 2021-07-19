using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FastLearner.Db.DomainModels
{
    public class Questionnaire
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
    }
}
