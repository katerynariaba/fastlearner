using AutoMapper;
using FastLearner.Api.Controllers;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.MappingProfiles;
using FastLearner.Domain.Services.Abstract;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace FastLearner.UnitTests
{
    public class CategoryUnitTests
    {
        [Fact]
        public async Task IfGetAllReturnCorrectQuantity()
        {
            var mockCategoryService = new Mock<ICategoryService>();

            IList<Category> categories = new List<Category>
            {
                new Category
                {
                    Id = 1

                },
                new Category
                {
                    Id = 2
                },
                new Category
                {
                    Id = 3
                }
            };

            mockCategoryService.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(categories));

            var myProfile = new MappingProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);

            var categoriesController = new CategoriesController(mockCategoryService.Object, mapper);

            //Act
            var result = (await categoriesController.GetAll()) as OkObjectResult;
            var value = result?.Value.As<IEnumerable<CategoryDto>>();

            //Assert
            value.Should().NotBeEmpty().And.HaveCount(3);
        }
    }
}
