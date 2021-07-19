using FastLearner.Db.Db;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.Models;
using FastLearner.Domain.Services.Abstract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Concrete
{
    public class ResultService : IResultService
    {
        private readonly FastLearnerDbContext _context;

        public ResultService(FastLearnerDbContext context)
        {
            _context = context;
        }

        public async Task<IList<Result>> GetByUserAsync(int userId, int questionnaireId)
        {
            var user = await _context.Users.Include(u => u.Results).FirstOrDefaultAsync(u => u.Id == userId);
            var results = await _context.Results
                                        .Include(u => u.User)
                                        .Include(q => q.Questionnaire)
                                        .Where(r=> r.User.Id == userId)
                                        .ToListAsync();

            return results;
        }

        public async Task AddAsync(CorrectAnswersPostModel answers, int userId, int questionnaireId)
        {
            var questionnaire = _context.Questionnaires.Where(r => r.Id == questionnaireId).Include(r => r.Questions).FirstOrDefault();

            var user = _context.Users.Where(r => r.Id == userId).FirstOrDefault();

            var countQuestion = questionnaire.Questions.Count();
            var percentage = answers.CorrectAnswers / (double)countQuestion * 100d;
            var percentageRounded = (int)Math.Round(percentage, 0);

            var result = new Result
            {
                User = user,
                DateTime = DateTime.UtcNow,
                Questionnaire = questionnaire,
                PercentageResult = percentageRounded
            };

            await _context.AddAsync(result);
            await _context.SaveChangesAsync();
        }

    }
}
