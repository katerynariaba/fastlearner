using FastLearner.Db.DomainModels;
using FastLearner.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IResultService
    {
        public Task<IList<Result>> GetByUserAsync(int userId, int questionnaireId);
        public Task AddAsync(CorrectAnswersPostModel answers, int userId, int questionnaireId);
    }
}
