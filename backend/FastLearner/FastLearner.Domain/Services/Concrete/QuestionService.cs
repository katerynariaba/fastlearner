using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class QuestionService : IQuestionService
    {
        private readonly FastLearnerDbContext _context;

        public QuestionService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Question>> GetByQuestionnaireIdAsync(int questionnaireId)
        {
            return await _context.Questions
                .Where(r => r.Questionnaire.Id == questionnaireId)
                .Include(r => r.Answers)
                .ToListAsync();
        }
    }
}
