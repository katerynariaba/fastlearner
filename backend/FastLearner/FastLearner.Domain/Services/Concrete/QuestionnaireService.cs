using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class QuestionnaireService : IQuestionnaireService
    {
        private readonly FastLearnerDbContext _context;

        public QuestionnaireService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<Questionnaire> GetByIdAsync(int id)
        {
            return await _context.Questionnaires.FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
