using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GardenWeb.Controllers
{
    public class BaseRootTypeController : Controller
    {
        // GET: BaseRootTypeController
        public ActionResult Index()
        {
            return View();
        }

        // GET: BaseRootTypeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BaseRootTypeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BaseRootTypeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BaseRootTypeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BaseRootTypeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BaseRootTypeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BaseRootTypeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
