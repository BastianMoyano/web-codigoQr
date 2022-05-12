using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;


namespace WebApplication1.Controllers
{
    public class CalendarioMateriaController : Controller
    {
        // GET: CalendarioMateria
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListaCalendarioMateria()
        {
            return Json(Modelo_Mantenedor.ListaCalendarioMateria(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDateCalendar(int Tipo, int Dato, int Id_turno)
        {

            return Json(Modelo_Mantenedor.GetDateCalendar(Tipo, Id_turno, Dato), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarCalendarioTurnos(CALENDARIO_MATERIA[] CALENDARIO_MATERIA, int MES, BorradoCalendarioTurno[] BorradoCalendarioTurno)
        {
            return Json(Modelo_Mantenedor.GuardarCalendarioTurnos(CALENDARIO_MATERIA, MES, BorradoCalendarioTurno), JsonRequestBehavior.AllowGet);
        }
    }
}