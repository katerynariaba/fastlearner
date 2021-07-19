using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class CourseService : ICourseService
    {
        private readonly FastLearnerDbContext _context;

        public CourseService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Course>> GetAllAsync()
        {
            return await _context.Courses
                .Include(r => r.Category)
                .ToListAsync();
        }

        public async Task<IList<Course>> GetByCategoryAsync(int? category)
        {
            if (!category.HasValue) throw new ArgumentException("Category id can not be null");

            return await _context.Courses
                .Include(r => r.Category)
                .Where(r => r.Category.Id == category).ToListAsync();
        }

        public async Task<IList<CourseExtendedDto>> GetByUserAsync(int userId)
        {
            var courses = await _context.Users.Where(r => r.Id == userId).SelectMany(r => r.Courses).Select(r => new CourseExtendedDto
            {
                Id = r.Id,
                Title = r.Title,
                Description = r.Description,
                Author = r.Author,
                Image = r.Image,
                NumberOfStudents = r.NumberOfStudents,
                Language = r.Language,
                SkillLevel = r.SkillLevel,
                Duration = r.Duration,
                Category = new CategoryDto
                {
                    Id = r.Category.Id,
                    Image = r.Category.Image,
                    Description = r.Category.Description,
                    Title = r.Category.Title
                },
                IsUserSubscribed = true,
                IsComleted = FastLearnerDbContext.IfUserCompleted(userId, r.Id)
            }).ToListAsync();

            return courses;
        }

        public async Task<IList<Course>> GetPopularAsync(int quantity)
        {
            var courses = await _context.Courses
                .OrderByDescending(r => r.NumberOfStudents)
                .Take(quantity)
                .ToListAsync();
          
            return courses;
        }
        public async Task<IList<Course>> GetRecommendationsAsync(int categoryId)
        {
            var courses = await _context.Courses
                .OrderByDescending(r => r.NumberOfStudents)
                .Where(r => r.Category.Id == categoryId)
                .ToListAsync();

            List<Course> popularCourses = new List<Course>();

            for (int i = 0; i < 4; i++)
            {
                popularCourses.Add(courses[i]);
            }
            return popularCourses;
        }

        public async Task<IList<Course>> GetPaginatedAsync(int page)
        {
            var courses = await _context.Courses.ToListAsync();

            return courses.Skip((page - 1) * 12).Take(12).ToList();
        }

        public async Task<Course> GetByIdAsync(int id)
        {
            return await _context.Courses
                .Include(r => r.Category)
                .Include(r => r.Users)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IList<Course>> SearchAsync(string search)
        {
            if (!string.IsNullOrEmpty(search))
            {
                return await _context.Courses.Where(s => s.Title.Contains(search)).ToListAsync();
            }
            else
            {
                return await _context.Courses.ToListAsync();
            }
        }

        public async Task SubscribeAsync(int courseId, int userId)
        {
            var course = await _context.Courses.Include(r => r.Users).FirstOrDefaultAsync(r => r.Id == courseId);
            var user = await _context.Users.FirstOrDefaultAsync(r => r.Id == userId);

            course.Users.Add(user);
            _context.Update(course);
            await _context.SaveChangesAsync();
        }

        public async Task UnsubscribeAsync(int courseId, int userId)
        {
            var course = await _context.Courses.Include(r => r.Users).FirstOrDefaultAsync(r => r.Id == courseId);
            var user = await _context.Users.FirstOrDefaultAsync(r => r.Id == userId);
            course.Users.Remove(user);
            _context.Update(course);
            await _context.SaveChangesAsync();
        }
    }
}
