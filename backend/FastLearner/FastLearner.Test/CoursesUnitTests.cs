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
    public class CoursesUnitTests
    {
        [Fact]
        public async Task IfGetAllReturnNotNull()
        {
            var mockCoursesService = new Mock<ICourseService>();
            IList<Course> courses = new List<Course>
            {
                new Course
                {
                    Id = 1

                },
                new Course
                {
                    Id = 2
                },
                new Course
                {
                    Id = 3
                }
            };

            mockCoursesService.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(courses));

            var myProfile = new MappingProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);

            var coursesController = new CoursesController(mockCoursesService.Object, mapper);

            //Act
            var result = (await coursesController.GetAll(null)) as OkObjectResult;
            var value = result?.Value.As<IEnumerable<CourseDto>>();

            //Assert
            Assert.NotNull(value);
        }

        [Fact]
        public async Task IfGetAllReturnCorrectQuantity()
        {
            //Arrange
            var mockCoursesService = new Mock<ICourseService>();

            var coursesByCategory = new List<Course>
            {
                new Course
                {
                    Id = 1,
                },
            };
            IList<Course> courses = new List<Course>
            {
                new Course
                {
                    Id = 1

                },
                new Course
                {
                    Id = 2
                },
                new Course
                {
                    Id = 3
                }
            };

            mockCoursesService.Setup(r => r.GetAllAsync()).Returns(Task.FromResult(courses));
            mockCoursesService.Setup(r => r.GetByCategoryAsync(It.IsAny<int?>()))
                .Returns(Task.FromResult(coursesByCategory as IList<Course>));

            var myProfile = new MappingProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);

            var coursesController = new CoursesController(mockCoursesService.Object, mapper);

            //Act
            var result = (await coursesController.GetAll(default)) as OkObjectResult;
            var value = result?.Value.As<IEnumerable<CourseDto>>();
            var resultWhithCategory = (await coursesController.GetAll(1)) as OkObjectResult;
            var valueWithCategory = resultWhithCategory?.Value.As<IEnumerable<CourseDto>>();

            //Assert
            value.Should().NotBeEmpty().And.HaveCount(3);
            valueWithCategory.Should().NotBeEmpty().And.HaveCount(1);
        }

    }
}
