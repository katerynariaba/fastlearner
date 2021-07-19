using FastLearner.Domain.DtoModels;
using FluentValidation;

namespace FastLearner.Api.Validators
{
    public class CommentValidator : AbstractValidator<CommentDto>
    {
        public CommentValidator()
        {
            RuleFor(course => course.Content).Length(1, 500);
        }
    }
}
