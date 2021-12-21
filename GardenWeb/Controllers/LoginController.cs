using GardenWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenWeb.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 이메일 인증
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EmailConfirm(string email)
        {
            try
            {
                return new JsonResult(true);
            }
            catch(Exception ex)
            {
                string error = Convert.ToString(ex);
                return new JsonResult(false);
            }
        }
     
        /// <summary>
        /// 회원가입
        /// </summary>
        /// <param name="gardenUser"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult JoinMembership(GardenUser gardenUser)
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                string error = Convert.ToString(ex);
                return View();
            }
        }
    }
}
