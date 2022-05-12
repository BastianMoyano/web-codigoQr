using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using QRCoder;
namespace WebApplication1.Models
{
    public class Modelo_Mantenedor
    {
        #region Permiso_menu
        public static object Permisos_Usuario()
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    //db.Configuration.LazyLoadingEnabled = false;
                    int? Usuario = (int)HttpContext.Current.Session["TIPO_USUARIO"];

                    object[] Menu = (from pm in db.MI_PERMISOS_MENU
                                     join m in db.MI_MENU
                                     on pm.COD_MODULO equals m.ID_MENU
                                     where pm.COD_TIPOUSUARIO == Usuario
                                     select new
                                     {
                                         m.ID_MENU,
                                         m.TIPO,
                                         m.NOMBRE_MENU,
                                         m.VISTA,
                                         m.CONTROLADOR,
                                         m.ICONO
                                     }).ToArray();

                    object[] Sub_menu = (from psm in db.MI_PERMISOS_SUB_MENU
                                         join sm in db.MI_SUB_MENU
                                         on psm.COD_SUB_MENU equals sm.ID_SUB_MODULO
                                         where psm.COD_TIPOUSUARIO == Usuario
                                         select new
                                         {
                                             sm.ID_SUB_MODULO,
                                             sm.NOMBRE,
                                             sm.VISTA,
                                             sm.CONTROLADOR,
                                             sm.COD_MODULO
                                         }).ToArray();

                    return new { Menu, Sub_menu };

                }
            }
            catch (Exception Error)
            {

                throw;
            }
        }
        #endregion


        #region Rol
        public static object CargarTipoUsuario()
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    object[] Datos = (from e in db.MI_TIPO_USUARIOS
                                          //join p in db.MI_ESTADOS on e.COD_ESTADO equals p.ID_ESTADO
                                      where e.ID_TIPO_USUARIO != 14
                                      select new
                                      {
                                          e.ID_TIPO_USUARIO,
                                          e.NOMBRE_TIPO_USUARIO
                                      }).ToArray();


                    return new { RESPUESTA = true, TIPO = 0, Datos };



                }

            }
            catch (Exception ERROR)
            {
                return new { RESPUESTA = false, TIPO = 0, Error = ERROR.Message };
            }
        }

        public static object GuardarTipoUsuario(MI_TIPO_USUARIOS MI_TIPO_USUARIOS)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {

                    MI_TIPO_USUARIOS existe = db.MI_TIPO_USUARIOS.Where(a => a.NOMBRE_TIPO_USUARIO == MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO).FirstOrDefault();
                    if (existe == null)
                    {
                        db.MI_TIPO_USUARIOS.Add(MI_TIPO_USUARIOS);
                        db.SaveChanges();

                        object r = (from e in db.MI_TIPO_USUARIOS
                                        //join p in db.MI_ESTADOS on e.COD_ESTADO equals p.ID_ESTADO
                                    where e.ID_TIPO_USUARIO == MI_TIPO_USUARIOS.ID_TIPO_USUARIO
                                    select new
                                    {
                                        e.ID_TIPO_USUARIO,
                                        e.NOMBRE_TIPO_USUARIO

                                    }).FirstOrDefault();

                        int id = Convert.ToInt32(HttpContext.Current.Session["ID"]);

                        //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG = new MI_RESPONSABLE_LOG
                        //{
                        //    RESPONSABLE = id,
                        //    FECHA_PROCESO = DateTime.Now,
                        //    MOTIVO = "REGISTRÓ",
                        //    TABLA = "MI_TIPO_USUARIOS",
                        //    DESCRIPCION = " ID_TIPO_USUARIO: (" + MI_TIPO_USUARIOS.ID_TIPO_USUARIO + "), NOMBRE  = (" + MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO + ")"

                        //};
                        //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG);
                        //db.SaveChanges();

                        return new { RESPUESTA = true, TIPO = 0, data = r };
                    }
                    else
                    {
                        return new { RESPUESTA = false, TIPO = 0 };
                    }


                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object ListaTipoUsuarioPorId(int id)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {




                    object[] datos = (from e in db.MI_TIPO_USUARIOS
                                      where e.ID_TIPO_USUARIO == id
                                      select new
                                      {
                                          e.ID_TIPO_USUARIO,
                                          e.NOMBRE_TIPO_USUARIO



                                      }).ToArray();


                    return new { RESPUESTA = true, TIPO = 0, datos };
                }

            }
            catch (Exception ext)
            {
                return new { RESPUESTA = false, TIPO = 1, ext.Message };
            }
        }

        public static object ModificarTipoUsuario(MI_TIPO_USUARIOS MI_TIPO_USUARIOS)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    List<MI_TIPO_USUARIOS> antigua = (from e in db.MI_TIPO_USUARIOS
                                                      where e.ID_TIPO_USUARIO == MI_TIPO_USUARIOS.ID_TIPO_USUARIO
                                                      select e).ToList();

                    MI_TIPO_USUARIOS existe = db.MI_TIPO_USUARIOS.Where(a => a.NOMBRE_TIPO_USUARIO == MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO).FirstOrDefault();
                    if (existe == null)
                    {
                        string subQuery = $@"UPDATE MI_TIPO_USUARIOS SET NOMBRE_TIPO_USUARIO = '{ MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO }' 
                                       where ID_TIPO_USUARIO = { MI_TIPO_USUARIOS.ID_TIPO_USUARIO } ";
                        db.Database.ExecuteSqlCommand(subQuery);

                        object r = (from e in db.MI_TIPO_USUARIOS
                                        //join p in db.MI_ESTADOS on e.COD_ESTADO equals p.ID_ESTADO
                                    where e.ID_TIPO_USUARIO == MI_TIPO_USUARIOS.ID_TIPO_USUARIO
                                    select new
                                    {
                                        e.ID_TIPO_USUARIO,
                                        e.NOMBRE_TIPO_USUARIO
                                    }).FirstOrDefault();

                        //foreach (var item in antigua)
                        //{

                        //    int id = Convert.ToInt32(HttpContext.Current.Session["ID"]);

                        //    MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG = new MI_RESPONSABLE_LOG
                        //    {
                        //        RESPONSABLE = id,
                        //        FECHA_PROCESO = DateTime.Now,
                        //        MOTIVO = "ACTUALIZÓ",
                        //        TABLA = "MI_TIPO_USUARIOS",
                        //        DESCRIPCION = " ID_TIPO_USUARIO: (" + MI_TIPO_USUARIOS.ID_TIPO_USUARIO + "), DATOS ANTERIORES: NOMBRE  = (" + item.NOMBRE_TIPO_USUARIO
                        //        + "), DATOS NUEVOS: NOMBRE  = (" + MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO + ")"

                        //    };
                        //    db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG);
                        //    db.SaveChanges();

                        //}

                        return new { RESPUESTA = true, TIPO = 0, data = r };

                    }
                    else
                    {

                        return new { RESPUESTA = false, TIPO = 2 };
                    }


                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }

        public static object EliminarRol(int IdUsuario)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    string NOMBREUSUARIO = (from o in db.MI_USUARIOS where o.ID_USUARIO == IdUsuario select o.NOMBRE_USUARIO).FirstOrDefault();

                    int id = Convert.ToInt32(HttpContext.Current.Session["ID"]);

                    var x = (from y in db.MI_TIPO_USUARIOS
                             where y.ID_TIPO_USUARIO == IdUsuario
                             select y).FirstOrDefault();

                    db.MI_TIPO_USUARIOS.Remove(x);
                    db.SaveChanges();

                    //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG = new MI_RESPONSABLE_LOG
                    //{
                    //    RESPONSABLE = id,
                    //    FECHA_PROCESO = DateTime.Now,
                    //    MOTIVO = "ELIMINÓ",
                    //    TABLA = "MI_TIPO_USUARIOS",
                    //    DESCRIPCION = "USUARIO: (" + NOMBREUSUARIO + ")"

                    //};
                    //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG);
                    //db.SaveChanges();

                    bool PM = db.MI_PERMISOS_MENU.Any(e => e.COD_TIPOUSUARIO == IdUsuario);
                    if (PM)
                    {
                        var xx = (from y in db.MI_PERMISOS_MENU
                                  where y.COD_TIPOUSUARIO == IdUsuario
                                  select y).FirstOrDefault();
                        db.MI_PERMISOS_MENU.Remove(xx);
                        db.SaveChanges();
                        //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG2 = new MI_RESPONSABLE_LOG
                        //{
                        //    RESPONSABLE = id,
                        //    FECHA_PROCESO = DateTime.Now,
                        //    MOTIVO = "ELIMINÓ",
                        //    TABLA = "MI_PERMISOS_MENU",
                        //    DESCRIPCION = "USUARIO: (" + NOMBREUSUARIO + ")"

                        //};
                        //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG2);
                        //db.SaveChanges();
                    }



                    bool Pn = db.MI_PERMISOS_SUB_MENU.Any(e => e.COD_TIPOUSUARIO == IdUsuario);
                    if (Pn)
                    {
                        var xxx = (from y in db.MI_PERMISOS_SUB_MENU
                                   where y.COD_TIPOUSUARIO == IdUsuario
                                   select y).FirstOrDefault();
                        db.MI_PERMISOS_SUB_MENU.Remove(xxx);
                        db.SaveChanges();

                        //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG3 = new MI_RESPONSABLE_LOG
                        //{
                        //    RESPONSABLE = id,
                        //    FECHA_PROCESO = DateTime.Now,
                        //    MOTIVO = "ELIMINÓ",
                        //    TABLA = "MI_PERMISOS_SUB_MENU",
                        //    DESCRIPCION = "USUARIO: (" + NOMBREUSUARIO + ")"

                        //};
                        //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG3);
                        //db.SaveChanges();
                    }



                    return new { RESPUESTA = true, TIPO = 0 };
                }

            }
            catch (Exception ERROR)
            {
                return new { RESPUESTA = false, TIPO = 0, Error = ERROR.Message };
            }
        }

        public static object Modulo(int Usuarios)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    List<Permisos> Permiso = new List<Permisos>();
                    List<Permisos> PermisoS = new List<Permisos>();

                    List<MI_MENU> modt = (from m in db.MI_MENU
                                          where m.ID_MENU != 1 && m.ID_MENU != 2 && m.ID_MENU != 3
                                          select m).ToList();

                    List<MI_SUB_MENU> sumod = (from sm in db.MI_SUB_MENU

                                               select sm).ToList();

                    List<MI_PERMISOS_MENU> Menupermiso = (from t in db.MI_PERMISOS_MENU
                                                          where t.COD_TIPOUSUARIO == Usuarios
                                                          select t
                                         ).ToList();

                    List<MI_PERMISOS_SUB_MENU> Submenopermiso = (from sub in db.MI_PERMISOS_SUB_MENU
                                                                 where sub.COD_TIPOUSUARIO == Usuarios
                                                                 select sub
                                         ).ToList();

                    foreach (var item in modt)
                    {
                        string Check = "";

                        foreach (var item2 in Menupermiso)
                        {
                            if (item.ID_MENU == item2.COD_MODULO)
                            {
                                Check = "checked";
                                break;

                            }
                            else
                            {
                                Check = "";

                            }

                        }


                        Permisos per = new Permisos()
                        {
                            Codigo = item.ID_MENU,
                            MiNombre = item.NOMBRE_MENU,
                            Ckeck = Check
                        };
                        Permiso.Add(per);

                    }

                    foreach (var item in sumod)
                    {
                        string Check = "";
                        foreach (var item2 in Submenopermiso)
                        {
                            if (item.ID_SUB_MODULO == item2.COD_SUB_MENU)
                            {
                                Check = "checked";
                                break;

                            }
                            else
                            {
                                Check = "";

                            }


                        }

                        Permisos perS = new Permisos()
                        {
                            Codigo = item.ID_SUB_MODULO,
                            MiNombre = item.NOMBRE,
                            Cod_modulo = item.COD_MODULO.Value,
                            Ckeck = Check
                        };
                        PermisoS.Add(perS);

                    }

                    object[] Datos = { Permiso, PermisoS };
                    return Datos;

                }
            }
            catch (Exception e)
            {
                return new { answer = false, type = 2, e.Message };
            }
        }

        public static object AddPermiso(int Us, int[] Modulos, int[] Sub_modulos)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    db.Configuration.LazyLoadingEnabled = false;
                    db.Database.ExecuteSqlCommand("DELETE FROM MI_PERMISOS_MENU where COD_TIPOUSUARIO ='" + Us + "' ");
                    db.Database.ExecuteSqlCommand("DELETE FROM MI_PERMISOS_SUB_MENU where COD_TIPOUSUARIO='" + Us + "'");

                    int id = Convert.ToInt32(HttpContext.Current.Session["ID"]);

                    foreach (var item2 in Modulos)
                    {
                        MI_PERMISOS_MENU mod = new MI_PERMISOS_MENU();
                        mod.COD_TIPOUSUARIO = Us;
                        mod.COD_MODULO = item2;
                        db.MI_PERMISOS_MENU.Add(mod);

                        string MODULO = (from o in db.MI_MENU where o.ID_MENU == item2 select o.NOMBRE_MENU).FirstOrDefault();
                        string TIPOUSUARIO = (from o in db.MI_TIPO_USUARIOS where o.ID_TIPO_USUARIO == Us select o.NOMBRE_TIPO_USUARIO).FirstOrDefault();


                        //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG = new MI_RESPONSABLE_LOG
                        //{
                        //    RESPONSABLE = id,
                        //    FECHA_PROCESO = DateTime.Now,
                        //    MOTIVO = "REGISTRÓ",
                        //    TABLA = "MI_PERMISOS_MENU",
                        //    DESCRIPCION = "ID_PERMISOS_MODULOS: " + mod.ID_PERMISOS_MODULOS + ", MODULO = ( " + MODULO
                        //                    + "), TIPO USUARIO = (" + TIPOUSUARIO + ")"

                        //};
                        //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG);

                    }
                    if (Sub_modulos != null)
                    {
                        foreach (var item4 in Sub_modulos)
                        {
                            MI_PERMISOS_SUB_MENU sub = new MI_PERMISOS_SUB_MENU();
                            sub.COD_TIPOUSUARIO = Us;
                            sub.COD_SUB_MENU = item4;
                            db.MI_PERMISOS_SUB_MENU.Add(sub);

                            string SUBMODULO = (from o in db.MI_SUB_MENU where o.ID_SUB_MODULO == item4 select o.NOMBRE).FirstOrDefault();
                            string TIPOUSUARIO = (from o in db.MI_TIPO_USUARIOS where o.ID_TIPO_USUARIO == Us select o.NOMBRE_TIPO_USUARIO).FirstOrDefault();

                            //MI_RESPONSABLE_LOG MI_RESPONSABLE_LOG = new MI_RESPONSABLE_LOG
                            //{
                            //    RESPONSABLE = id,
                            //    FECHA_PROCESO = DateTime.Now,
                            //    MOTIVO = "REGISTRÓ",
                            //    TABLA = "MI_PERMISOS_SUB_MENU",
                            //    DESCRIPCION = "ID_PERMISOS_SUB_MENU: (" + sub.ID_PERMISOS_SUB_MENU + "), SUBMODULO = (" + SUBMODULO
                            //    + "), TIPO USUARIO = (" + TIPOUSUARIO + ")"

                            //};
                            //db.MI_RESPONSABLE_LOG.Add(MI_RESPONSABLE_LOG);
                        }
                    }


                    db.SaveChanges();

                    return new { answer = true, type = 2 };
                }
            }
            catch (Exception e)
            {
                return new { answer = false, type = 2, e.Message };
            }

        }
        #endregion
        #region crearQrEntrada
        public static object CrearQrentradaSalida()
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    TORNIQUETE[] _data = db.TORNIQUETE.ToArray();
                    List<GuardarTorniquete> GuardarTorniquete1 = new List<GuardarTorniquete>();

                    foreach (TORNIQUETE item in _data)
                    {
                        GuardarTorniquete _GuardarTorniquete = new GuardarTorniquete();
                        TORNIQUETE1 GeneradorTorniquete = new TORNIQUETE1();


                        GeneradorTorniquete.ID_TORNIQUETE = item.ID_TORNIQUETE;
                        GeneradorTorniquete.FECHA = DateTime.Now.ToString("dd/MM/yyyy");
                        GeneradorTorniquete.HORA = DateTime.Now.ToString("HH:mm");
                        GeneradorTorniquete.INACTIVIDAD = 30;

                        var jsonStringName = new JavaScriptSerializer();

                        QRCodeGenerator qrGenerador = new QRCodeGenerator();
                        QRCodeData qrDatos = qrGenerador.CreateQrCode(jsonStringName.Serialize(GeneradorTorniquete), QRCodeGenerator.ECCLevel.H);
                        QRCode qrCodigo = new QRCode(qrDatos);

                        using (Bitmap bitmap = qrCodigo.GetGraphic(20))
                        {
                            using (MemoryStream ms = new MemoryStream())
                            {
                                bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                                byte[] imageBytes = ms.ToArray();
                                string imgCtrl = "data:image/gif;base64," + Convert.ToBase64String(imageBytes);
                                _GuardarTorniquete.imgCtrl = imgCtrl;
                                GuardarTorniquete1.Add(_GuardarTorniquete);

                            }
                        }
                    }


                    return new { RESPUESTA = true, TIPO = 0, data = GuardarTorniquete1 };

                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion
        #region  crearQrEntradaBici
        public static object ListaEstacionamiento()
        {
            using (ProyectoVisionEntities db = new ProyectoVisionEntities())
            {
                object[] datos = (from u in db.ESTACIONAMIENTO
                                  where u.ID_ESTADO == 1
                                  select new
                                  {
                                      u.ID_ESTACIONAMIENTO,
                                      u.CUPO,
                                      u.ID_ESTADO
                                  }).ToArray();

                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object CrearQrentradaSalidaBici(ESTACIONAMIENTO ESTACIONAMIENTO)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {

                    string subQuery = $@"UPDATE ESTACIONAMIENTO SET ID_ESTADO = { 2 }
                                       where ID_ESTACIONAMIENTO = { ESTACIONAMIENTO.ID_ESTACIONAMIENTO } ";
                    db.Database.ExecuteSqlCommand(subQuery);

                    ESTACIONAMIENTO1 GeneradorEstacionamiento = new ESTACIONAMIENTO1();
                    List<GuardarTorniquete> GuardarTorniquete1 = new List<GuardarTorniquete>();
                    GuardarTorniquete _GuardarTorniquete = new GuardarTorniquete();
                    GeneradorEstacionamiento.ID_ESTACIONAMIENTO = ESTACIONAMIENTO.ID_ESTACIONAMIENTO;
                    GeneradorEstacionamiento.FECHA = DateTime.Now.ToString("dd/MM/yyyy");
                    GeneradorEstacionamiento.HORA = DateTime.Now.ToString("HH:mm");
                    GeneradorEstacionamiento.INACTIVIDAD = 30;

                    var jsonStringName = new JavaScriptSerializer();

                    QRCodeGenerator qrGenerador = new QRCodeGenerator();
                    QRCodeData qrDatos = qrGenerador.CreateQrCode(jsonStringName.Serialize(GeneradorEstacionamiento), QRCodeGenerator.ECCLevel.H);
                    QRCode qrCodigo = new QRCode(qrDatos);

                    using (Bitmap bitmap = qrCodigo.GetGraphic(20))
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                            byte[] imageBytes = ms.ToArray();
                            string imgCtrl = "data:image/gif;base64," + Convert.ToBase64String(imageBytes);
                            _GuardarTorniquete.imgCtrl = imgCtrl;
                            GuardarTorniquete1.Add(_GuardarTorniquete);
                            return new { RESPUESTA = true, TIPO = 0, data = GuardarTorniquete1 };
                        }
                    }





                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion

        #region BIBLIOTECA
        public static object CargarBiblioteca()
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    //LIBRO l = db.LIBRO.Where(l => l.ID_LIBRO == 1).FirstOrDefault();
                    //List<LIBRO> LIBRO = db.LIBRO.ToList();


                    object Cantidadlibro = (from d in db.LIBRO
                                            select new
                                            {
                                                d.ID_LIBRO,
                                                d.TITULO,
                                                d.ANO,
                                                d.AUTOR,
                                                d.NUMERO_PAGINA,
                                                Categoria = (from n in db.CATEGORIA_LIBRO
                                                               where n.ID_CATEGORIA == d.ID_CATEGORIA
                                                               select n.NOMBRE_CATEGORIA).FirstOrDefault(),
                                             
                                                d.DESCRIPCION,
                                                d.IMAGEN,
                                                numeroserie = (from n in db.SERIELIBRO
                                                               where n.ID_LIBRO == d.ID_LIBRO && n.ID_ESTADO == 1
                                                               select n.SERIE).Count()
                                            }).ToList();


                    return new { RESPUESTA = true, TIPO = 0, data = Cantidadlibro };



                }

            }
            catch (Exception ERROR)
            {
                return new { RESPUESTA = false, TIPO = 0, Error = ERROR.Message };
            }
        }
        public static object CrearQrLibro(int id)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    //LIBRO l = db.LIBRO.Where(l => l.ID_LIBRO == 1).FirstOrDefault();
                    //List<LIBRO> LIBRO = db.LIBRO.ToList();


                    object IDCantidadlibro = (from n in db.SERIELIBRO
                                                               where n.ID_LIBRO == id && n.ID_ESTADO == 1
                                                               select n.ID_LIBROSERIE
                                            ).FirstOrDefault();
                    string subQuery = $@"UPDATE SERIELIBRO SET ID_ESTADO = { 2 }
                                       where ID_LIBROSERIE = { IDCantidadlibro } ";
                    db.Database.ExecuteSqlCommand(subQuery);


                    SERIELIBRO1 GeneradorSerieLibro = new SERIELIBRO1();
                    List<GuardarTorniquete> GuardarTorniquete1 = new List<GuardarTorniquete>();
                    GuardarTorniquete _GuardarTorniquete = new GuardarTorniquete();
                    GeneradorSerieLibro.ID_LIBROSERIE = IDCantidadlibro;
                    GeneradorSerieLibro.FECHA = DateTime.Now.ToString("dd/MM/yyyy");
                    GeneradorSerieLibro.HORA = DateTime.Now.ToString("HH:mm");
                    GeneradorSerieLibro.INACTIVIDAD = 30;

                    object Cantidadlibro = (from d in db.LIBRO
                                            select new
                                            {
                                                
                                                numeroserie = (from n in db.SERIELIBRO
                                                               where n.ID_LIBRO == id && n.ID_ESTADO == 1
                                                               select n.SERIE).Count()
                                            }).ToList();
                    var jsonStringName = new JavaScriptSerializer();

                    QRCodeGenerator qrGenerador = new QRCodeGenerator();
                    QRCodeData qrDatos = qrGenerador.CreateQrCode(jsonStringName.Serialize(GeneradorSerieLibro), QRCodeGenerator.ECCLevel.H);
                    QRCode qrCodigo = new QRCode(qrDatos);

                    using (Bitmap bitmap = qrCodigo.GetGraphic(20))
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                            byte[] imageBytes = ms.ToArray();
                            string imgCtrl = "data:image/gif;base64," + Convert.ToBase64String(imageBytes);
                            _GuardarTorniquete.imgCtrl = imgCtrl;
                            GuardarTorniquete1.Add(_GuardarTorniquete);
                            return new { RESPUESTA = true, TIPO = 0, data = GuardarTorniquete1, data1 = id , data2 = Cantidadlibro };
                        }
                    }

                   



                }

            }
            catch (Exception ERROR)
            {
                return new { RESPUESTA = false, TIPO = 0, Error = ERROR.Message };
            }
        }
        #endregion
        #region Crear Asistencia
        public static object ListaAsingacionMateriaProfesor()
        {
            using (ProyectoVisionEntities db = new ProyectoVisionEntities())
            {
       
                int Usuario = Convert.ToInt32(HttpContext.Current.Session["ID"]);
                object[] datos = (from u in db.ASIGNACION_PROFESOR
                                  
                                  where u.ID_USUARIO == Usuario
                                  select new
                                  {
                                      
                                      Seccion = (from n in db.SECCION
                                                   where n.ID_SECCION == u.ID_SECCION
                                                   select new
                                                   {
                                                       n.ID_SECCION,
                                                       n.SECCION1
                                                      
                                                   }).FirstOrDefault(),
                                  }).ToArray();

                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }

        public static object ListaSeccion(int Seccion)
        {
            using (ProyectoVisionEntities db = new ProyectoVisionEntities())
            {

                
                object[] datos = (from u in db.SECCION

                                  where u.ID_SECCION == Seccion
                                  select new
                                  {

                                      MATERIA = (from n in db.MATERIA
                                                 where n.ID_MATERIA == u.ID_MATERIA
                                                 select new
                                                 {
                                                     n.ID_MATERIA,
                                                     n.DESCRIPCION

                                                 }).FirstOrDefault(),
                                  }).ToArray();

                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }
        public static object ListaDiaMateria(int Materia)
        {
            using (ProyectoVisionEntities db = new ProyectoVisionEntities())
            {
                string fecha = DateTime.Now.ToString("yyyy/MM/dd");
                var fecha1 = Convert.ToDateTime(fecha).Date;

              
                object[] datos = (from n in db.CALENDARIO_MATERIA
                                             where n.ID_MATERIA == Materia && n.FECHA == fecha1
                                  select new
                                             {
                                                 n.ID_CALENDARIOMATERIA,
                                                 n.FECHA

                                             }).ToArray();
                                  

                return new { RESPUESTA = true, TIPO = 0, datos };
            }
        }
        public static object CrearQrAsistencia(ASISTENCIA_MATERIA ASISTENCIA_MATERIA2)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {

                    List<ASIGNACION_ALUMNO> lista = (from e in db.ASIGNACION_ALUMNO
                                                    where e.ID_SECCION == ASISTENCIA_MATERIA2.ID_SECCION
                                                    select e).ToList();

                    foreach (var item in lista)
                    {
                        
                        ASISTENCIA_MATERIA asistencialumno = new ASISTENCIA_MATERIA
                        {

                            ID_SECCION = item.ID_SECCION,
                            ID_CALENDARIOMATERIA = ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA,
                            ID_USUARIO = item.ID_USUARIO,
                            ASISTENCIA= 0

                        };
                        db.ASISTENCIA_MATERIA.Add(asistencialumno);
                        db.SaveChanges();

                    }
                    //string subQuery = $@"UPDATE ESTACIONAMIENTO SET ID_ESTADO = { 2 }
                    //                   where ID_ESTACIONAMIENTO = { ESTACIONAMIENTO.ID_ESTACIONAMIENTO } ";
                    //db.Database.ExecuteSqlCommand(subQuery);

                    ASISTENCIQR GeneradorASIS = new ASISTENCIQR();
                    List<GuardarTorniquete> GuardarTorniquete1 = new List<GuardarTorniquete>();
                    GuardarTorniquete _GuardarTorniquete = new GuardarTorniquete();
                    //GeneradorEstacionamiento.ID_ESTACIONAMIENTO = ESTACIONAMIENTO.ID_ESTACIONAMIENTO;
                    GeneradorASIS.ID_SECCION = ASISTENCIA_MATERIA2.ID_SECCION.Value;
                    GeneradorASIS.ID_CALENDARIOMATERIA = ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA.Value;
                   
                

                    var jsonStringName = new JavaScriptSerializer();

                    QRCodeGenerator qrGenerador = new QRCodeGenerator();
                    QRCodeData qrDatos = qrGenerador.CreateQrCode(jsonStringName.Serialize(GeneradorASIS), QRCodeGenerator.ECCLevel.H);
                    QRCode qrCodigo = new QRCode(qrDatos);

                    using (Bitmap bitmap = qrCodigo.GetGraphic(20))
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                            byte[] imageBytes = ms.ToArray();
                            string imgCtrl = "data:image/gif;base64," + Convert.ToBase64String(imageBytes);
                            _GuardarTorniquete.imgCtrl = imgCtrl;
                            GuardarTorniquete1.Add(_GuardarTorniquete);
                            return new { RESPUESTA = true, TIPO = 0, data = GuardarTorniquete1 };
                        }
                    }





                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        public static object CrearQrAsistenciaExamen(ASISTENCIA_MATERIA ASISTENCIA_MATERIA2)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {

                    List<ASIGNACION_ALUMNO> lista = (from e in db.ASIGNACION_ALUMNO
                                                     where e.ID_SECCION == ASISTENCIA_MATERIA2.ID_SECCION
                                                     select e).ToList();

                    foreach (var item in lista)
                    {

                        ASISTENCIA_MATERIA asistencialumno = new ASISTENCIA_MATERIA
                        {

                            ID_SECCION = item.ID_SECCION,
                            ID_CALENDARIOMATERIA = ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA,
                            ID_USUARIO = item.ID_USUARIO,
                            ASISTENCIA = 0,
                            EXAMEN = 1
                        };
                        db.ASISTENCIA_MATERIA.Add(asistencialumno);
                        db.SaveChanges();

                    }
                    //string subQuery = $@"UPDATE ESTACIONAMIENTO SET ID_ESTADO = { 2 }
                    //                   where ID_ESTACIONAMIENTO = { ESTACIONAMIENTO.ID_ESTACIONAMIENTO } ";
                    //db.Database.ExecuteSqlCommand(subQuery);

                    ASISTENCIQR GeneradorASIS = new ASISTENCIQR();
                    List<GuardarTorniquete> GuardarTorniquete1 = new List<GuardarTorniquete>();
                    GuardarTorniquete _GuardarTorniquete = new GuardarTorniquete();
                    //GeneradorEstacionamiento.ID_ESTACIONAMIENTO = ESTACIONAMIENTO.ID_ESTACIONAMIENTO;
                    GeneradorASIS.ID_SECCION = ASISTENCIA_MATERIA2.ID_SECCION.Value;
                    GeneradorASIS.ID_CALENDARIOMATERIA = ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA.Value;



                    var jsonStringName = new JavaScriptSerializer();

                    QRCodeGenerator qrGenerador = new QRCodeGenerator();
                    QRCodeData qrDatos = qrGenerador.CreateQrCode(jsonStringName.Serialize(GeneradorASIS), QRCodeGenerator.ECCLevel.H);
                    QRCode qrCodigo = new QRCode(qrDatos);

                    using (Bitmap bitmap = qrCodigo.GetGraphic(20))
                    {
                        using (MemoryStream ms = new MemoryStream())
                        {
                            bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                            byte[] imageBytes = ms.ToArray();
                            string imgCtrl = "data:image/gif;base64," + Convert.ToBase64String(imageBytes);
                            _GuardarTorniquete.imgCtrl = imgCtrl;
                            GuardarTorniquete1.Add(_GuardarTorniquete);
                            return new { RESPUESTA = true, TIPO = 0, data = GuardarTorniquete1 };
                        }
                    }





                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion
        #region calendario materia
        public static object ListaCalendarioMateria()
        {
            using (ProyectoVisionEntities db = new ProyectoVisionEntities())
            {


                object[] Datos = (from n in db.MATERIA
                                  select new
                                  {
                                      n.ID_MATERIA,
                                      n.DESCRIPCION

                                  }).ToArray();
                                 

                return new { RESPUESTA = true, TIPO = 0, Datos };
            }
        }
        public static object GetDateCalendar(int Tipo, int Id_turno, int Dato)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {

                    if (Tipo == 1)
                    {
                        object[] datos = (from dt in db.CALENDARIO_MATERIA
                                          where dt.ID_MATERIA == Id_turno && dt.FECHA.Value.Month == Dato

                                          select new
                                          {
                                              dt.ID_MATERIA,
                                              dt.FECHA,
                                              dt.ID_CALENDARIOMATERIA
                                          }).OrderBy(a => a.FECHA).ToArray();
                        return new { RESPUESTA = true, TIPO = 0, datos };
                    }
                    else
                    {
                        object[] datos = (from dt in db.CALENDARIO_MATERIA
                                          where dt.ID_MATERIA == Id_turno && dt.FECHA.Value.Year == Dato
                                          select new
                                          {
                                              dt.ID_MATERIA,
                                              dt.FECHA,
                                              dt.ID_CALENDARIOMATERIA
                                          }).OrderBy(a => a.FECHA).ToArray();
                        return new { RESPUESTA = true, TIPO = 0, datos };
                    }

                }
            }
            catch (Exception ext)
            {
                return new { RESPUESTA = false, TIPO = 1, ext.Message };
            }

        }
        public static object GuardarCalendarioTurnos(CALENDARIO_MATERIA[] CALENDARIO_MATERIA, int MES, BorradoCalendarioTurno[] BorradoCalendarioTurno)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    if (BorradoCalendarioTurno != null)
                    {
                        foreach (BorradoCalendarioTurno item in BorradoCalendarioTurno)
                        {
                            string subQuery = $"DELETE FROM CALENDARIO_MATERIA WHERE FECHA = '" + item.FECHA.ToString("yyyy-MM-dd") + "' AND ID_MATERIA = " + item.ID_MATERIA + "";
                            db.Database.ExecuteSqlCommand(subQuery);
                        }
                    }

                    if (CALENDARIO_MATERIA != null)
                    {
                        foreach (CALENDARIO_MATERIA item in CALENDARIO_MATERIA)
                        {
                            db.CALENDARIO_MATERIA.Add(item);

                        }

                        db.SaveChanges();
                    }




                    return new { RESPUESTA = true, TIPO = 0, MES };
                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
        #endregion
    }
}
class Permisos
{
    public string Ckeck { get; set; }
    public int Codigo { get; set; }

    public int Cod_modulo { get; set; }
    public string MiNombre { get; set; }
}

class TORNIQUETE1
{

    public int ID_TORNIQUETE { get; set; }

    public string FECHA { get; set; }

    public string HORA { get; set; }

    public int INACTIVIDAD { get; set; }


}
class GuardarTorniquete
{
    public string imgCtrl { get; set; }
}
class ESTACIONAMIENTO1
{

    public int ID_ESTACIONAMIENTO { get; set; }
    public string FECHA { get; set; }

    public string HORA { get; set; }

    public int INACTIVIDAD { get; set; }


}
class SERIELIBRO1
{

    public object ID_LIBROSERIE { get; set; }
    public string FECHA { get; set; }

    public string HORA { get; set; }

    public int INACTIVIDAD { get; set; }


}

class ASISTENCIQR
{


    public int ID_SECCION { get; set; }
    public int ID_CALENDARIOMATERIA { get; set; }


}

public class BorradoCalendarioTurno
{
    public int ID_MATERIA { get; set; }
    public DateTime FECHA { get; set; }
}