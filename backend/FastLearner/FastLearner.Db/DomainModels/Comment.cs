using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FastLearner.Db.DomainModels
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }

        public Comment()
        {
            DateTime = DateTime.UtcNow;
        }
    }
}
