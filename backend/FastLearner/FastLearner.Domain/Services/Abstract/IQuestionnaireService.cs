using FastLearner.Db.DomainModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IQuestionnaireService
    {
        public Task<Questionnaire> GetByIdAsync(int id);
    }
}
