using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FastLearner.Db.DomainModels
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        [ForeignKey("QuestionnaireId")]
        public virtual Questionnaire Questionnaire { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }

    }
}
