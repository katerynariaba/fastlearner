using FastLearner.Db.DomainModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FastLearner.Domain.Services.Abstract
{
    public interface ILessonService
    {
        public Task<Lesson> GetByIdAsync(int id);
        public Task<IList<Lesson>> GetByCourseIdAsync(int courseId);
    }
}
