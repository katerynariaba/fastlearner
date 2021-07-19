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
    public class LessonsUnitTests
    {
        [Fact]
        public async Task IfGetByCourseIdReturnCorrectQuantity()
        {
            var mockLessonsService = new Mock<ILessonService>();

            IList<Lesson> lessons = new List<Lesson>
            {
                new Lesson
                {
                    Id = 1

                },
                new Lesson
                {
                    Id = 2
                },
                new Lesson
                {
                    Id = 3
                }
            };

            mockLessonsService.Setup(r => r.GetByCourseIdAsync(It.IsAny<int>())).Returns(Task.FromResult(lessons));

            var myProfile = new MappingProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);

            var lessonsController = new LessonsController(mockLessonsService.Object, mapper);

            //Act
            var result = (await lessonsController.GetByCourseId(1)) as OkObjectResult;
            var value = result?.Value.As<IEnumerable<LessonDto>>();

            //Assert
            value.Should().NotBeEmpty().And.HaveCount(3);
        }

        [Fact]
        public async Task IfGetByIdIsNotNull()
        {
            var mockLessonsService = new Mock<ILessonService>();

            Lesson lesson = new Lesson
            {
                Id = 1
            };

            mockLessonsService.Setup(r => r.GetByIdAsync(It.IsAny<int>())).Returns(Task.FromResult(lesson));

            var myProfile = new MappingProfile();
            var configuration = new MapperConfiguration(cfg => cfg.AddProfile(myProfile));
            IMapper mapper = new Mapper(configuration);

            var lessonsController = new LessonsController(mockLessonsService.Object, mapper);

            //Act
            var result = (await lessonsController.GetById(2)) as OkObjectResult;
            var value = result?.Value.As<LessonDto>();

            //Assert
            value.Should().NotBeNull();
        }
    }
}
