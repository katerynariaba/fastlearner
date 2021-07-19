using FastLearner.Domain.Models;
using FluentValidation;

namespace FastLearner.Api.Validators
{
    public class UserValidator : AbstractValidator<UserPostModel>
    {
        public UserValidator()
        {
            RuleFor(user => user.FirstName).Length(2, 50);
            RuleFor(user => user.LastName).Length(2, 50);
            RuleFor(user => user.Login).Length(2, 50);
            RuleFor(user => user.Email).EmailAddress().MaximumLength(255);
        }
    }
}
