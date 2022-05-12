using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MetricaController : Controller
    {
        // GET: Metrica
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Ingreso_salida_sede()
        {
            var JsonResult = Json(ModeloMetrica.Ingreso_salida_sede(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Ingreso_salida_Bici()
        {
            var JsonResult = Json(ModeloMetrica.Ingreso_salida_Bici(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Alumno_de_mayor_inasistencia()
        {
            var JsonResult = Json(ModeloMetrica.Alumno_de_mayor_inasistencia(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Alumno_de_mayor_asistencia()
        {
            var JsonResult = Json(ModeloMetrica.Alumno_de_mayor_asistencia(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Asistenciaordenadaporalumno()
        {
            var JsonResult = Json(ModeloMetrica.Asistenciaordenadaporalumno(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Promediomasalto()
        {
            var JsonResult = Json(ModeloMetrica.Promediomasalto(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult Promediomasbajo()
        {
            var JsonResult = Json(ModeloMetrica.Promediomasbajo(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult asistenciainasitenciaporalumnoexamen()
        {
            var JsonResult = Json(ModeloMetrica.asistenciainasitenciaporalumnoexamen(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult mayorasistenciapormateria()
        {
            var JsonResult = Json(ModeloMetrica.mayorasistenciapormateria(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult menorasistenciapormateria()
        {
            var JsonResult = Json(ModeloMetrica.menorasistenciapormateria(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult librosprestado()
        {
            var JsonResult = Json(ModeloMetrica.librosprestado(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult librosmasprestado()
        {
            var JsonResult = Json(ModeloMetrica.librosmasprestado(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult librosmenosprestado()
        {
            var JsonResult = Json(ModeloMetrica.librosmenosprestado(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
        public JsonResult librostasaprestado()
        {
            var JsonResult = Json(ModeloMetrica.librostasaprestado(), JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }
    }
}