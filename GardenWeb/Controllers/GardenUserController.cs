using GardenWeb.Data;
using GardenWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GardenWeb.Controllers
{
    public class GardenUserController : Controller
    {
        private readonly GardenWebContext _context;

        public GardenUserController(GardenWebContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        
       
        private GardenUser GetCurrentUserInfo()
        {
            GardenUser user = new GardenUser();
            try
            {
                ClaimsPrincipal currentUser = HttpContext.User;
                if (currentUser.HasClaim(z => z.Type == "eml"))
                {
                    
                    string email = currentUser.FindFirst(c => c.Type == "eml").Value;
                    return _context.GardenUser.FirstOrDefault(g => g.Email == email);
                }
                return user;
            }
            catch
            {
                
                return user;
            }
        }

        public IActionResult Detail()
        {
           
            return View();
        }
    }
}
