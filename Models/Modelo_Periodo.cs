using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Modelo_Periodo
    {
        public static object ListarPeriodo()
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    object[] Datos = (from u in db.PERIODO
                                      where u.ID_ESTADO == 1 
                                      select new
                                      {
                                          u.IDPERIODO,
                                          u.DESCRIPCION,
                                          u.FECHA_INICIO,
                                          u.FECHA_FIN,
                                          u.ID_ESTADO
                                      }).ToArray();


                    return new { RESPUESTA = true, TIPO = 0, Datos };



                }

            }
            catch (Exception ERROR)
            {
                return new { RESPUESTA = false, TIPO = 0, Error = ERROR.Message };
            }
        }


        public static object GuardarPeriodo(string DESCRIPCION, string FECHA_INICIO, int? ID_ESTADO )
        {

           string[] separadas;

            separadas = FECHA_INICIO.Split('-'); 
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    PERIODO existe = db.PERIODO.Where(a => a.DESCRIPCION == DESCRIPCION).FirstOrDefault();
                    if (existe == null)
                    {
                        PERIODO PERIODO1 = new PERIODO
                        {
                            DESCRIPCION = DESCRIPCION,
                            FECHA_INICIO = Convert.ToDateTime(separadas[0]),
                            FECHA_FIN = Convert.ToDateTime(separadas[1]),
                            ID_ESTADO = ID_ESTADO



                        };
                        db.PERIODO.Add(PERIODO1);
                        db.SaveChanges();

                        object r = (from u in db.PERIODO

                                    where u.IDPERIODO == PERIODO1.IDPERIODO
                                    select new
                                    {
                                        u.IDPERIODO,
                                        u.DESCRIPCION,
                                        u.FECHA_INICIO,
                                        u.FECHA_FIN,
                                        u.ID_ESTADO
                                    }).FirstOrDefault();

   

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

        public static object ListaPeriodo_con_Id(int id)
        {
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {




                    object[] datos = (from u in db.PERIODO
                                      where u.IDPERIODO == id
                                      select new
                                      {
                                          u.IDPERIODO,
                                          u.DESCRIPCION,
                                          u.FECHA_INICIO,
                                          u.FECHA_FIN,
                                          u.ID_ESTADO

                                      }).ToArray();


                    return new { RESPUESTA = true, TIPO = 0, datos };
                }

            }
            catch (Exception ext)
            {
                return new { RESPUESTA = false, TIPO = 1, ext.Message };
            }
        }

        public static object ModificarPerido(int? IDPERIODO, string DESCRIPCION, string FECHA_INICIO, int? ID_ESTADO)
        {
            string[] separadas;

            separadas = FECHA_INICIO.Split('-');
            string fecha1 = Convert.ToDateTime(separadas[0]).ToString("yyyy/MM/dd");
            string fecha2 = Convert.ToDateTime(separadas[1]).ToString("yyyy/MM/dd");
            try
            {
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
            

                    PERIODO existe = db.PERIODO.Where(a => a.DESCRIPCION == DESCRIPCION).FirstOrDefault();

                    if (existe == null)
                    {
                        string subQuery = $@"UPDATE PERIODO SET DESCRIPCION = '{ DESCRIPCION }' , FECHA_INICIO = '{fecha1}',FECHA_FIN = '{fecha2}',ID_ESTADO = {ID_ESTADO}
                                       where IDPERIODO = { IDPERIODO } ";
                        db.Database.ExecuteSqlCommand(subQuery);

                 

                        object r = (from u in db.PERIODO

                                    where u.IDPERIODO == IDPERIODO
                                    select new
                                    {
                                        u.IDPERIODO,
                                        u.DESCRIPCION,
                                        u.FECHA_INICIO,
                                        u.FECHA_FIN,
                                        u.ID_ESTADO
                                    }).FirstOrDefault();


                        return new { RESPUESTA = true, TIPO = 1, data = r };
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
    }
}