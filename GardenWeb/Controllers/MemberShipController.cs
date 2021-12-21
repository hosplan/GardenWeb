using GardenWeb.Data;
using GardenWeb.Helper;
using GardenWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GardenWeb.Controllers
{
    public class MemberShipController : Controller
    {
        private readonly GardenWebContext _context;
        private readonly HashService _hashService;
        private readonly IConfiguration _config;
        private readonly IJWTService _jwtService;
        public MemberShipController(GardenWebContext GardenWebContext, HashService hashService, IConfiguration config, IJWTService jwtService)
        {
            _context = GardenWebContext;
            _hashService = hashService;
            _config = config;
            _jwtService = jwtService;
        }

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 이메일 중복 검사
        /// </summary>
        /// <param name="email">중복 검사해야될 email</param>
        /// <returns>존재할시 true, 없을시 false</returns>
        [HttpPost]
        public JsonResult CheckEmail([FromBody] GardenUser gardenUser)
        {
            try
            {
                GardenUser gUser = _context.GardenUser.FirstOrDefault(gUser => gUser.Email == gardenUser.Email);

                if (gUser != null)
                {
                    return new JsonResult(false);
                }
                
                return new JsonResult(true);
            }
            catch(Exception ex)
            {
                string error = Convert.ToString(ex);
                return new JsonResult(false);
            }
        }

        

        /// <summary>
        /// 회원 정보 저장.
        /// </summary>
        /// <param name="gardenUser"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GenerateUser(GardenUser gardenUser)
        {
            try
            {
                HashSalt hashSalt = _hashService.EncryptionPassword(gardenUser.Password);

                gardenUser.Password = hashSalt.SaltPassword;
                gardenUser.StoredSalt = hashSalt.Salt;

                _context.Add(gardenUser);
                await _context.SaveChangesAsync();

                await GenerateUserRole(gardenUser);
                //return View();
                return RedirectToAction("IndexForConfirm", new { id = gardenUser.Id });
            }
            catch(Exception ex)
            {
                string error = Convert.ToString(ex);
                return View("/Error");
            }
        }

        
        private async Task GenerateUserRole(GardenUser gardenUser)
        {
            GardenRole guestRole = _context.GardenRole.FirstOrDefault(g => g.RoleName == "Guest");

            UserRoleMap userRoleMap = new UserRoleMap
            {
                UserId = gardenUser.Id,
                RoleId = guestRole.Id
            };

            _context.Add(userRoleMap);
            await _context.SaveChangesAsync();
        }

        public IActionResult IndexForConfirm()
        {
            return View();
        }
    }
}
