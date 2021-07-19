using AutoMapper;
using FastLearner.Api.Extensions;
using FastLearner.Db.DomainModels;
using FastLearner.Domain.DtoModels;
using FastLearner.Domain.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FastLearner.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public CommentsController(ICommentService commentService, IMapper mapper, IUserService userService)
        {
            _commentService = commentService;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet("course/{courseId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByCourseId(int courseId)
        {
            var comments = await _commentService.GetByCourseIdAsync(courseId);
            var commentsDto = _mapper.Map<List<CommentDto>>(comments);

            commentsDto.Reverse();

            return Ok(commentsDto);
        }

        [HttpPost("{courseId}")]
        public async Task<IActionResult> Add(CommentDto commentDto, int courseId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = _mapper.Map<Comment>(commentDto);

            User user = await _userService.GetByIdAsync(HttpContext.GetUserId());
            comment.User = user;

            await _commentService.AddAsync(comment, courseId);
            var commentResponseDto = _mapper.Map<CommentDto>(comment);

            return Ok(commentResponseDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!HttpContext.IsAdmin()) return StatusCode(403);
            await _commentService.DeleteAsync(id);
            return Ok();
        }
    }
}