using FastLearner.Db.DomainModels;
using Microsoft.EntityFrameworkCore;
using System;

namespace FastLearner.Db.Db
{
    public class FastLearnerDbContext : DbContext
    {
        public FastLearnerDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Lesson> Lectures { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> QuestionAnswers { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Result> Results { get; set; }

        [DbFunction("IfUserCompleted", "dbo")]
        public static bool IfUserCompleted(int userId, int courseId)
        {
            throw new NotImplementedException();
        }
    }
}
