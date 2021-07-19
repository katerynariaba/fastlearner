using FastLearner.Db.DomainModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface ICommentService
    {
        public Task<IList<Comment>> GetByCourseIdAsync(int courseId);
        public Task AddAsync(Comment comment, int courseId);
        public Task DeleteAsync(int id);
    }
}
