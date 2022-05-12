using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace WebApplication1.Models
{
    public class Modelo_Login
    {
        public static string Llave = "jwey89e09ewhfo24";


        public static string Encriptar(string dato, string llave)
        {
            byte[] keyArray;
            byte[] encriptar = Encoding.UTF8.GetBytes(dato);

            keyArray = Encoding.UTF8.GetBytes(llave);
            var tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] resultado = cTransform.TransformFinalBlock(encriptar, 0, encriptar.Length);
            tdes.Clear();
            return Convert.ToBase64String(resultado, 0, resultado.Length);
        }

        public static object Autentificar(string Rut, string Contrasena)
        {

            try
            {
                bool Respuesta;
                int Tipo;
                using (ProyectoVisionEntities db = new ProyectoVisionEntities())
                {
                    MI_USUARIOS Usuario = db.MI_USUARIOS.Where(a => a.RUT == Rut).FirstOrDefault();
                    if (Usuario != null)
                    {
                     
                            if (Usuario.COD_ESTADO == 1)
                            {

                                if (Usuario.CONSTRASENA == Encriptar(Contrasena, Llave))
                                {
                                    Respuesta = true;
                                    Tipo = 1;
                                    HttpContext.Current.Session["USUARIO"] = Usuario.NOMBRE_USUARIO;
                                    HttpContext.Current.Session["TIPO_USUARIO"] = Usuario.COD_TIPO_USUARIO;
                                    HttpContext.Current.Session["RUT"] = Usuario.RUT;
                                    HttpContext.Current.Session["ID"] = Usuario.ID_USUARIO;
                                }
                                else
                                {
                                    Respuesta = false;
                                    Tipo = 2;
                                }
                            }
                            else
                            {
                                Respuesta = false;
                                Tipo = 3;
                            }
                      

                    }
                    else
                    {
                        Respuesta = false;
                        Tipo = 4;
                    }

                    object Data = new { Respuesta, Tipo };
                    return Data;
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }

    }
}