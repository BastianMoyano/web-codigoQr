using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Ingreso(string Rut, string Contrasena)
        {
            return Json(Modelo_Login.Autentificar(Rut, Contrasena), JsonRequestBehavior.AllowGet);
        }

        public ActionResult CerrarSesion()
        {
            Session.RemoveAll();
            return RedirectToAction("Index", "Login");
        }
    }
}