using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Crear()
        {
            return View();
        }
        public JsonResult ListarPeriodo()
        {
            return Json(Modelo_Periodo.ListarPeriodo(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarPeriodo(string DESCRIPCION, string FECHA_INICIO, int? ID_ESTADO)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Periodo.GuardarPeriodo(DESCRIPCION, FECHA_INICIO, ID_ESTADO), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaPeriodo_con_Id(int id)
        {
            return Json(Modelo_Periodo.ListaPeriodo_con_Id(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificarPerido(int? IDPERIODO, string DESCRIPCION, string FECHA_INICIO, int? ID_ESTADO)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Periodo.ModificarPerido(IDPERIODO,DESCRIPCION, FECHA_INICIO, ID_ESTADO), JsonRequestBehavior.AllowGet);
        }
    }
}