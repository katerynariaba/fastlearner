using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class CommentService : ICommentService
    {
        private readonly FastLearnerDbContext _context;

        public CommentService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Comment>> GetByCourseIdAsync(int courseId)
        {
            return await _context.Comments
                .Include(r => r.User)
                .Where(r => r.Course.Id == courseId)
                .ToListAsync();
        }

        public async Task AddAsync(Comment comment, int courseId)
        {
            Course course = await _context.Courses.FirstOrDefaultAsync(r => r.Id == courseId);
            comment.Course = course;
            _context.Add(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(r => r.Id == id);
            _context.Remove(comment);
            await _context.SaveChangesAsync();
        }
    }
}
