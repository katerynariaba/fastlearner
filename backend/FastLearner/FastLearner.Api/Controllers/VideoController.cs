using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace FastLearner.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public VideoController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{name}")]
        public IActionResult GetVideo([FromRoute] string name)
        {
            if (string.IsNullOrEmpty(name)) return BadRequest("Filename is empty");

            var StorageLocation = _configuration["StoragePath"];
            var fullPath = Path.Combine(StorageLocation, name);

            if (!System.IO.File.Exists(fullPath)) return BadRequest("No file with given name");

            return PhysicalFile(fullPath, "application/octet-stream", enableRangeProcessing: true);
        }
    }
}