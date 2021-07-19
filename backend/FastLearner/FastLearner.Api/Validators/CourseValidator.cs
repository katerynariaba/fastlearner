using FastLearner.Domain.DtoModels;
using FluentValidation;

namespace FastLearner.Api.Validators
{
    public class CourseValidator : AbstractValidator<CourseDto>
    {
        public CourseValidator()
        {
            RuleFor(course => course.Title).Length(2, 50);
            RuleFor(course => course.Description).MaximumLength(500);
        }
    }
}
