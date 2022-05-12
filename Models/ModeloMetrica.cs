using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ModeloMetrica
    {

        public static object Ingreso_salida_sede()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT US.NOMBRE_USUARIO, COUNT(*) AS 'Asistencia a la sede' , AVG(datediff(hour,FECHA_HORA_INGRESO, FECHA_HORA_SALIDA)) AS 'Promedio HRS', (SELECT COUNT(*) FROM ASISTENCIA_MATERIA AM WHERE ASISTENCIA = 0 AND AM.ID_USUARIO = RI.ID_USUARIO) AS INASISTENCIA FROM REGISTRO_INGRESO RI LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = RI.ID_USUARIO GROUP BY RI.ID_USUARIO, US.NOMBRE_USUARIO";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Ingreso_salida_sede = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       Asistencia_a_la_sede = row[1],
                       Promediohrs = row[2],
                       inasistencia = row[3],
                     


                   }).ToArray();




                return new { Respuesta = true, Ingreso_salida_sede };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }

        public static object Ingreso_salida_Bici()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"   SELECT US.NOMBRE_USUARIO, COUNT(*) AS 'Numero de usos' , AVG(datediff(hour,FECHA_HORA_INGRESO, FECHA_HORA_SALIDA)) AS 'Promedio HRS', 100.0*(SELECT COUNT(*) FROM ESTACIONAMIENTO WHERE ID_ESTADO = 2)/(SELECT COUNT(*) FROM ESTACIONAMIENTO WHERE ID_ESTADO = 1) AS 'TASA' FROM REGISTRO_BICICLETA RB LEFT JOIN ESTACIONAMIENTO ES ON RB.ID_ESTACIONAMIENTO = ES.ID_ESTACIONAMIENTO LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = RB.ID_USUARIO GROUP BY RB.ID_USUARIO, US.NOMBRE_USUARIO";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Ingreso_salida_Bici = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       numerodeuso = row[1],
                       Promediohrs = row[2],
                       tasa = row[3],



                   }).ToArray();




                return new { Respuesta = true, Ingreso_salida_Bici };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }

        public static object Alumno_de_mayor_inasistencia()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"     SELECT TOP 1 US.NOMBRE_USUARIO AS ALUMNO, MAT.DESCRIPCION AS MATERIA, (SELECT COUNT(*) FROM [ASISTENCIA_MATERIA] AM WHERE [ASISTENCIA] = 0 AND AM.ID_USUARIO = AMN.ID_USUARIO AND AM.ID_SECCION = AMN.ID_SECCION) AS 'MAYOR INASISTENCIA' FROM ASISTENCIA_MATERIA AMN LEFT JOIN SECCION SEC ON SEC.ID_SECCION = AMN.ID_SECCION  LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = AMN.ID_USUARIO GROUP BY US.NOMBRE_USUARIO, MAT.DESCRIPCION, AMN.ID_SECCION, AMN.ID_USUARIO ORDER BY 'MAYOR INASISTENCIA' DESC";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Alumno_de_mayor_inasistencia = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       materia = row[1],
                       mayor_inasistencia = row[2]
                   



                   }).ToArray();




                return new { Respuesta = true, Alumno_de_mayor_inasistencia };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object Alumno_de_mayor_asistencia()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT TOP 1 US.NOMBRE_USUARIO AS ALUMNO, MAT.DESCRIPCION AS MATERIA, (SELECT COUNT(*) FROM [ASISTENCIA_MATERIA] AM WHERE [ASISTENCIA] = 1 AND AM.ID_USUARIO = AMN.ID_USUARIO AND AM.ID_SECCION = AMN.ID_SECCION) AS 'MAYOR ASISTENCIA' FROM ASISTENCIA_MATERIA AMN LEFT JOIN SECCION SEC ON SEC.ID_SECCION = AMN.ID_SECCION  LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = AMN.ID_USUARIO GROUP BY US.NOMBRE_USUARIO, MAT.DESCRIPCION, AMN.ID_SECCION, AMN.ID_USUARIO ORDER BY 'MAYOR ASISTENCIA' DESC";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Alumno_de_mayor_asistencia = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       materia = row[1],
                       mayor_asistencia = row[2]




                   }).ToArray();




                return new { Respuesta = true, Alumno_de_mayor_asistencia };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object Asistenciaordenadaporalumno()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT US.NOMBRE_USUARIO, (SELECT COUNT(*) FROM [ASISTENCIA_MATERIA] AM WHERE [ASISTENCIA] = 0 AND AM.ID_USUARIO = AMN.ID_USUARIO) AS INASISTENCIA, (SELECT COUNT(*) FROM [ASISTENCIA_MATERIA] AM WHERE [ASISTENCIA] = 1 AND AM.ID_USUARIO = AMN.ID_USUARIO) AS ASISTENCIA FROM ASISTENCIA_MATERIA AMN LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = AMN.ID_USUARIO GROUP BY US.NOMBRE_USUARIO, AMN.ID_USUARIO";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Asistenciaordenadaporalumno = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       inasistencia = row[1],
                       asistencia = row[2]




                   }).ToArray();




                return new { Respuesta = true, Asistenciaordenadaporalumno };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }

        public static object Promediomasalto()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT TOP 1 US.NOMBRE_USUARIO, MAT.DESCRIPCION,(SELECT (NOTA1+NOTA2+NOTA3)/3 FROM ASIGNACION_ALUMNO ASM WHERE ASM.ID_USUARIO = ASN.ID_USUARIO AND ASM.ID_SECCION = ASN.ID_SECCION) AS PROMEDIO FROM ASIGNACION_ALUMNO ASN LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = ASN.ID_USUARIO LEFT JOIN SECCION SEC ON SEC.ID_SECCION = ASN.ID_SECCION LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA GROUP BY ASN.ID_SECCION, US.NOMBRE_USUARIO, ASN.ID_USUARIO, MAT.DESCRIPCION ORDER BY PROMEDIO DESC ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Promediomasalto = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       materia = row[1],
                       promedio = row[2]




                   }).ToArray();




                return new { Respuesta = true, Promediomasalto };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object Promediomasbajo()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"SELECT TOP 1 US.NOMBRE_USUARIO, MAT.DESCRIPCION,(SELECT (NOTA1+NOTA2+NOTA3)/3 FROM ASIGNACION_ALUMNO ASM WHERE ASM.ID_USUARIO = ASN.ID_USUARIO AND ASM.ID_SECCION = ASN.ID_SECCION) AS PROMEDIO FROM ASIGNACION_ALUMNO ASN LEFT JOIN MI_USUARIOS US ON US.ID_USUARIO = ASN.ID_USUARIO LEFT JOIN SECCION SEC ON SEC.ID_SECCION = ASN.ID_SECCION LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA GROUP BY ASN.ID_SECCION, US.NOMBRE_USUARIO, ASN.ID_USUARIO, MAT.DESCRIPCION ORDER BY PROMEDIO ASC ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array Promediomasbajo = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       materia = row[1],
                       promedio = row[2]




                   }).ToArray();




                return new { Respuesta = true, Promediomasbajo };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object asistenciainasitenciaporalumnoexamen()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"SELECT US.NOMBRE_USUARIO, (SELECT COUNT(*) FROM ASISTENCIA_MATERIA ASN WHERE ASISTENCIA = 1 AND EXAMEN = 1 AND ASN.ID_USUARIO = ASM.ID_USUARIO ) AS ASISTENCIA, (SELECT COUNT(*) FROM ASISTENCIA_MATERIA ASN WHERE ASISTENCIA = 0 AND EXAMEN = 1 AND ASN.ID_USUARIO = ASM.ID_USUARIO ) AS INASISTENCIA FROM ASISTENCIA_MATERIA ASM LEFT JOIN MI_USUARIOS US ON ASM.ID_USUARIO = US.ID_USUARIO GROUP BY ASM.ID_USUARIO,  US.NOMBRE_USUARIO";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array asistenciainasitenciaporalumnoexamen = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       Id_usuario = row[0],
                       asistencia = row[1],
                       Inasistencia = row[2]




                   }).ToArray();




                return new { Respuesta = true, asistenciainasitenciaporalumnoexamen };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object mayorasistenciapormateria()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"SELECT TOP 1 MAT.DESCRIPCION ,(SELECT COUNT(*) FROM ASISTENCIA_MATERIA ASM WHERE ASM.ID_SECCION = ASN.ID_SECCION AND EXAMEN = 1 AND ASISTENCIA = 1) AS ASISTENCIA FROM ASISTENCIA_MATERIA ASN LEFT JOIN SECCION SEC ON SEC.ID_SECCION = ASN.ID_SECCION LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA GROUP BY ASN.ID_SECCION, MAT.DESCRIPCION ORDER BY ASISTENCIA DESC";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array mayorasistenciapormateria = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       materia = row[0],
                       asistencia = row[1],
              




                   }).ToArray();




                return new { Respuesta = true, mayorasistenciapormateria };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }

        public static object menorasistenciapormateria()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"SELECT TOP 1 MAT.DESCRIPCION ,(SELECT COUNT(*) FROM ASISTENCIA_MATERIA ASM WHERE ASM.ID_SECCION = ASN.ID_SECCION AND EXAMEN = 1 AND ASISTENCIA = 1) AS ASISTENCIA FROM ASISTENCIA_MATERIA ASN LEFT JOIN SECCION SEC ON SEC.ID_SECCION = ASN.ID_SECCION LEFT JOIN MATERIA MAT ON MAT.ID_MATERIA = SEC.ID_MATERIA GROUP BY ASN.ID_SECCION, MAT.DESCRIPCION ORDER BY ASISTENCIA ASC";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array menorasistenciapormateria = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       materia = row[0],
                       asistencia = row[1],





                   }).ToArray();




                return new { Respuesta = true, menorasistenciapormateria };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object librosprestado()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @"SELECT COUNT(*) AS 'Libros Prestados' FROM REGISTRO_LIBRO ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array librosprestado = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       libro = row[0],
                       





                   }).ToArray();




                return new { Respuesta = true, librosprestado };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object librosmasprestado()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT TOP 1 LI.TITULO, (SELECT COUNT(*) FROM registro_libro RLI WHERE RLI.ID_LIBROSERIE = RL.ID_LIBROSERIE ) AS 'CANTIDAD PRESTADOS' FROM REGISTRO_LIBRO RL LEFT JOIN SERIELIBRO SLI ON SLI.ID_LIBROSERIE = RL.ID_LIBROSERIE LEFT JOIN LIBRO LI ON LI.ID_LIBRO = SLI.ID_LIBRO GROUP BY RL.ID_LIBROSERIE, LI.TITULO ORDER BY 'CANTIDAD PRESTADOS' DESC ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array librosmasprestado = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       libro = row[0],
                       Cantidad = row[1]






                   }).ToArray();




                return new { Respuesta = true, librosmasprestado };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object librosmenosprestado()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" SELECT TOP 1 LI.TITULO, (SELECT COUNT(*) FROM registro_libro RLI WHERE RLI.ID_LIBROSERIE = RL.ID_LIBROSERIE ) AS 'CANTIDAD PRESTADOS' FROM REGISTRO_LIBRO RL LEFT JOIN SERIELIBRO SLI ON SLI.ID_LIBROSERIE = RL.ID_LIBROSERIE LEFT JOIN LIBRO LI ON LI.ID_LIBRO = SLI.ID_LIBRO GROUP BY RL.ID_LIBROSERIE, LI.TITULO ORDER BY 'CANTIDAD PRESTADOS' ASC ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array librosmenosprestado = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       libro = row[0],
                       Cantidad = row[1]






                   }).ToArray();




                return new { Respuesta = true, librosmenosprestado };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
        public static object librostasaprestado()
        {
            try
            {
                string cs = ConfigurationManager.ConnectionStrings["CON"].ToString();
                SqlConnection conn = new SqlConnection(cs);

                string query = @" 	 SELECT TOP 1 100.0*(SELECT COUNT(*) FROM SERIELIBRO WHERE ID_ESTADO = '2')/( SELECT COUNT(*) FROM SERIELIBRO WHERE ID_ESTADO = '1') AS 'TASA' FROM REGISTRO_LIBRO	 ";


                SqlDataAdapter da = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);

                Array librostasaprestado = dt.Rows.Cast<DataRow>()
                   .Select(row => new
                   {
                       tasa = row[0],
                      






                   }).ToArray();




                return new { Respuesta = true, librostasaprestado };
            }
            catch (Exception error)
            {

                return new { Respuesta = false, error.Message };
            }
        }
    }
}