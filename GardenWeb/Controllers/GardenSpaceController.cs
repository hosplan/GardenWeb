using Microsoft.AspNetCore.Mvc;

namespace GardenWeb.Controllers
{
    public class GardenSpaceController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail(int id)
        {
            ViewBag.id = id;
            return View();
        }

        public IActionResult IndexForGardenBaseType(int id)
        {
            ViewBag.id = id;
            return View();
        }
    }
}
