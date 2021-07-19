using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class CategoryService : ICategoryService
    {
        private readonly FastLearnerDbContext _context;

        public CategoryService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
