using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FastLearner.Domain.DtoModels
{
    public class ResultDto
    {
        [Key]
        public int Id { get; set; }
        public int PercentageResult { get; set; }
        public DateTime DateTime { get; set; }
        [ForeignKey("QuestionnaireId")]
        public QuestionnaireDto Questionnaire { get; set; }
        [ForeignKey("UserId")]
        public virtual UserDto UserDto { get; set; }
    }
}
