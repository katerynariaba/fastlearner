using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface ICourseService
    {
        public Task<IList<Course>> GetAllAsync();
        public Task<Course> GetByIdAsync(int id);
        public Task<IList<Course>> GetByCategoryAsync(int? categoryId);
        public Task<IList<Course>> GetPopularAsync(int quantity);
        public Task<IList<Course>> GetRecommendationsAsync(int categoryId);
        public Task<IList<Course>> GetPaginatedAsync(int page);
        public Task<IList<CourseExtendedDto>> GetByUserAsync(int userId);
        public Task<IList<Course>> SearchAsync(string search);
        public Task SubscribeAsync(int courseId, int userId);
        public Task UnsubscribeAsync(int courseId, int userId);
    }
}
