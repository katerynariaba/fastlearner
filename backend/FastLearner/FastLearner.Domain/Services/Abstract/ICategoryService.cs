using FastLearner.Db.DomainModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface ICategoryService
    {
        public Task<IList<Category>> GetAllAsync();
    }
}
