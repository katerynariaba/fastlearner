using FastLearner.Db.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace FastLearner.Api.Extensions
{
    public static class HttpContextExtensions
    {
        public static bool IsInRole(this HttpContext httpContext, UserRole role) =>
            httpContext.User.Claims.Any(r => r.Type == ClaimTypes.Role && r.Value == ((int)role).ToString());
        public static bool IsAdmin(this HttpContext httpContext) =>
            IsInRole(httpContext, UserRole.Admin);

        public static int GetUserId(this HttpContext httpContext)
        {
            var claimsIdentity = httpContext.User.Identity as ClaimsIdentity;
            var sub = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            try
            {
                return Int32.Parse(sub);
            }
            catch (Exception)
            {
                return -1;
            }
        }
    }

}
