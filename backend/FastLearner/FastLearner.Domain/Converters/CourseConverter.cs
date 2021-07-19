using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using System;
using System.Linq;

namespace FastLearner.Domain.Converters
{
    public static class CourseConverter
    {
        public static CourseDto ToDto(this Course course, int userId)
        {
            if (course == null) throw new ArgumentNullException();

            return new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                Author = course.Author,
                Image = course.Image,
                NumberOfStudents = course.NumberOfStudents,
                Language = course.Language,
                SkillLevel = course.SkillLevel,
                Duration = course.Duration,
                Category = new CategoryDto
                {
                    Id = course.Category.Id,
                    Image = course.Category.Image,
                    Description = course.Category.Description,
                    Title = course.Category.Title
                },
                IsUserSubscribed = course.Users?.Any(r => r.Id == userId) ?? false
            };
        }
    }
}
