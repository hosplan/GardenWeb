using Microsoft.AspNetCore.Mvc;

namespace GardenWeb.Controllers
{
    public class GardenSpaceController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail()
        {
            return View();
        }

        public IActionResult IndexForGardenBaseType()
        {
            return View();
        }
    }
}
