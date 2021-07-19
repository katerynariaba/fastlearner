using System;

namespace FastLearner.Domain.DtoModels
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }
        public UserDto User { get; set; }
    }
}
