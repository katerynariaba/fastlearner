using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FastLearner.Db.DomainModels
{
    public class Result
    {
        [Key]
        public int Id { get; set; }
        public int PercentageResult { get; set; }
        public DateTime DateTime { get; set; }
        [ForeignKey("QuestionnaireId")]
        public virtual Questionnaire Questionnaire { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
