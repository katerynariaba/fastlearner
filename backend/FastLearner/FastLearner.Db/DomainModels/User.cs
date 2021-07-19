using FastLearner.Db.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FastLearner.Db.DomainModels
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public UserRole? Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public string TwitterUrl { get; set; }
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LinkendinUrl { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public string ConfirmationCode { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Result> Results { get; set; }
    }
}
