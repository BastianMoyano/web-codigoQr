using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ProfesorController : Controller
    {
        // GET: Profesor
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListaAsingacionMateriaProfesor()
        {
            return Json(Modelo_Mantenedor.ListaAsingacionMateriaProfesor(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaSeccion(int Seccion)
        {
            return Json(Modelo_Mantenedor.ListaSeccion(Seccion), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListaDiaMateria(int Materia)
        {
            return Json(Modelo_Mantenedor.ListaDiaMateria(Materia), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CrearQrAsistencia(ASISTENCIA_MATERIA ASISTENCIA_MATERIA2)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.CrearQrAsistencia(ASISTENCIA_MATERIA2), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CrearQrAsistenciaExamen(ASISTENCIA_MATERIA ASISTENCIA_MATERIA2)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.CrearQrAsistenciaExamen(ASISTENCIA_MATERIA2), JsonRequestBehavior.AllowGet);
        }

    }
}