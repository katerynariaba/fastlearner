using FastLearner.Db.DomainModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface IQuestionService
    {
        public Task<IList<Question>> GetByQuestionnaireIdAsync(int questionnaireId);
    }
}
