using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class LessonService : ILessonService
    {
        private readonly FastLearnerDbContext _context;

        public LessonService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<Lesson> GetByIdAsync(int id)
        {
            return await _context.Lessons.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IList<Lesson>> GetByCourseIdAsync(int courseId)
        {
            return await _context.Lessons
                .Where(r => r.Course.Id == courseId)
                .ToListAsync();
        }
    }
}
