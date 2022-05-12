using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MantenedorController : Controller
    {
        #region VISTA
        // GET: Mantenedor
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add_Roles()
        {
            if (Session["USUARIO"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        public ActionResult Add_Entrada_Salida()
        {
            if (Session["USUARIO"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        public ActionResult Add_Entrada_SalidaBicicleta()
        {
            if (Session["USUARIO"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        public ActionResult Add_Biblioteca()
        {
            if (Session["USUARIO"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }
        #endregion

        #region rol
        public JsonResult CargarTipoUsuario()
        {
            return Json(Modelo_Mantenedor.CargarTipoUsuario(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GuardarTipoUsuario(MI_TIPO_USUARIOS MI_TIPO_USUARIOS)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.GuardarTipoUsuario(MI_TIPO_USUARIOS), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaTipoUsuarioPorId(int id)
        {
            return Json(Modelo_Mantenedor.ListaTipoUsuarioPorId(id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ModificarTipoUsuario(MI_TIPO_USUARIOS MI_TIPO_USUARIOS)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.ModificarTipoUsuario(MI_TIPO_USUARIOS), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Modulos(int Usuarios)
        {
            return Json(Modelo_Mantenedor.Modulo(Usuarios), JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPermiso(int us, int[] modulos, int[] sub_modulos)
        {

            return Json(Modelo_Mantenedor.AddPermiso(us, modulos, sub_modulos), JsonRequestBehavior.AllowGet);
        }
        public JsonResult EliminarRol(int IdUsuario)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.EliminarRol(IdUsuario), JsonRequestBehavior.AllowGet);
        }
        #endregion
        #region crearQrEntrada
        public JsonResult CrearQrentradaSalida()
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.CrearQrentradaSalida(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region crearQrEntradaBici
        public JsonResult ListaEstacionamiento()
        {
            return Json(Modelo_Mantenedor.ListaEstacionamiento(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CrearQrentradaSalidaBici(ESTACIONAMIENTO ESTACIONAMIENTO)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.CrearQrentradaSalidaBici(ESTACIONAMIENTO), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region BIBLIOTECA 
        public JsonResult CargarBiblioteca()
        {
            return Json(Modelo_Mantenedor.CargarBiblioteca(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CrearQrLibro(int id)
        {
            if (Session["USUARIO"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Mantenedor.CrearQrLibro(id), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}