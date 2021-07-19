using AutoMapper;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;

namespace FastLearner.Domain.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<Comment, CommentDto>();
            CreateMap<Course, CourseDto>();
            CreateMap<Lesson, LessonDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<Answer, AnswerDto>();
            CreateMap<Result, ResultDto>();
            CreateMap<Questionnaire, QuestionnaireDto>();

            CreateMap<UserDto, User>();
            CreateMap<CategoryDto, Category>();
            CreateMap<CommentDto, Comment>();
            CreateMap<CourseDto, Course>();
            CreateMap<LessonDto, Lesson>();
            CreateMap<QuestionDto, Question>();
            CreateMap<AnswerDto, Answer>();
            CreateMap<QuestionnaireDto, Questionnaire>();
            CreateMap<ResultDto, Result>();
        }
    }
}
