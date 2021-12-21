using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenWeb.Helper
{
    public class MinimumGradeRequirement : IAuthorizationRequirement
    {
        public int MinimumGrade { get; }

        public MinimumGradeRequirement(int minimumGrade)
        {
            MinimumGrade = minimumGrade;
        }
    }

    public class MinimumGradeHandler : AuthorizationHandler<MinimumGradeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumGradeRequirement requirement)
        {
            if(!context.User.HasClaim(z => z.Type == "rol"))
            {
                return Task.CompletedTask;
            }
            else if(Convert.ToInt32(context.User.FindFirst(c => c.Type == "rol").Value) >= requirement.MinimumGrade)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
