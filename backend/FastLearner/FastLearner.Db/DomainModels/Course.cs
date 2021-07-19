using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FastLearner.Db.DomainModels
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public int NumberOfStudents { get; set; }
        public string Language { get; set; }
        public string SkillLevel { get; set; }
        public float Duration { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public virtual ICollection<Lesson> Lectures { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<User> Users { get; set; }

    }
}
