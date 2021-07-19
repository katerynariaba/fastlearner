using FastLearner.Domain.DtoModels;
using FluentValidation;

namespace FastLearner.Api.Validators
{
    public class LectureValidator : AbstractValidator<LessonDto>
    {
        public LectureValidator()
        {
            RuleFor(lecture => lecture.Title).Length(2, 50);
            RuleFor(lecture => lecture.Description).MaximumLength(500);
        }
    }
}
