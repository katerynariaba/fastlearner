using FastLearner.Domain.DtoModels;
using FluentValidation;

namespace FastLearner.Api.Validators
{
    public class CategoryValidator : AbstractValidator<CategoryDto>
    {
        public CategoryValidator()
        {
            RuleFor(user => user.Title).MinimumLength(2);
        }
    }
}
