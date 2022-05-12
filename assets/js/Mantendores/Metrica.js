var bouncejsShow = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 450, y: 0 }, to: { x: 0, y: 0 },
            easing: 'bounce',
            duration: 1000,
            bounces: 4,
            stiffness: 3
        })
        .scale({
            from: { x: 1.2, y: 1 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 4,
            stiffness: 1
        })
        .scale({
            from: { x: 1, y: 1.2 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 6,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};

var bouncejsClose = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 0, y: 0 }, to: { x: 450, y: 0 },
            easing: 'bounce',
            duration: 500,
            bounces: 4,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};


const Espanol = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};

window.addEventListener('load', function () {
    Ingreso_salida_sede();
    Ingreso_salida_Bici();
    Asistenciaordenadaporalumno();
    Alumno_de_mayor_inasistencia();
    Alumno_de_mayor_asistencia();
    Promediomasalto();
    Promediomasbajo();
    asistenciainasitenciaporalumnoexamen();
    mayorasistenciapormateria();
    menorasistenciapormateria();
    librosprestado();
    librosmasprestado();
    librosmenosprestado();
    librostasaprestado();
});
/////primeros
const Ingreso_salida_sede = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Ingreso_salida_sede',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyGestion');

                let Contenido = '';

                console.log(Data);

                Data.Ingreso_salida_sede.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.Asistencia_a_la_sede + '</td>';
                    Contenido += '<td>' + item.Promediohrs + '</td>';
                    Contenido += '<td>' + item.inasistencia + '</td>';
                   
                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#Gestion").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Gestion_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
           });


};

const Ingreso_salida_Bici = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Ingreso_salida_Bici',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyCierre');

                let Contenido = '';

                console.log(Data);

                Data.Ingreso_salida_Bici.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.numerodeuso + '</td>';
                    Contenido += '<td>' + item.Promediohrs + '</td>';
                    Contenido += '<td>' + item.tasa + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#Cierre").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
/////
////segundos ////
const Asistenciaordenadaporalumno = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Asistenciaordenadaporalumno',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyAsistenciaordenadaporalumno');

                let Contenido = '';

                console.log(Data);

                Data.Asistenciaordenadaporalumno.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.inasistencia + '</td>';
                    Contenido += '<td>' + item.asistencia + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#Asistenciaordenadaporalumno").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const Alumno_de_mayor_inasistencia = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Alumno_de_mayor_inasistencia',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyMayorInasistencia');

                let Contenido = '';

                console.log(Data);

                Data.Alumno_de_mayor_inasistencia.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.mayor_inasistencia + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#MayorInasistencia").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const Alumno_de_mayor_asistencia = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Alumno_de_mayor_asistencia',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyMayorasistencia');

                let Contenido = '';

                console.log(Data);

                Data.Alumno_de_mayor_asistencia.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.mayor_asistencia + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#Mayorasistencia").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const Promediomasalto = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Promediomasalto',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodypromediomasalto');

                let Contenido = '';

                console.log(Data);

                Data.Promediomasalto.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.promedio + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#promediomasalto").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const Promediomasbajo = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/Promediomasbajo',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodypromediomasabajo');

                let Contenido = '';

                console.log(Data);

                Data.Promediomasbajo.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.promedio + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#promediomasbajo").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const asistenciainasitenciaporalumnoexamen = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/asistenciainasitenciaporalumnoexamen',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyasistenciainasitenciaporalumnoexamen');

                let Contenido = '';

                console.log(Data);

                Data.asistenciainasitenciaporalumnoexamen.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.Id_usuario + '</td>';
                    Contenido += '<td>' + item.asistencia + '</td>';
                    Contenido += '<td>' + item.Inasistencia + '</td>';

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#asistenciainasitenciaporalumnoexamen").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const mayorasistenciapormateria = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/mayorasistenciapormateria',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodymayorasistenciapormateria');

                let Contenido = '';

                console.log(Data);

                Data.mayorasistenciapormateria.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.asistencia + '</td>';
                   

                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#mayorasistenciapormateria").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const menorasistenciapormateria = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/menorasistenciapormateria',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodymenorasistenciapormateria');

                let Contenido = '';

                console.log(Data);

                Data.menorasistenciapormateria.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.materia + '</td>';
                    Contenido += '<td>' + item.asistencia + '</td>';


                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#menorasistenciapormateria").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const librosprestado = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/librosprestado',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodyPrestados');

                let Contenido = '';

                console.log(Data);

                Data.librosprestado.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.libro + '</td>';
                  


                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#Prestados").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const librosmasprestado = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/librosmasprestado',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodymasPrestados');

                let Contenido = '';

                console.log(Data);

                Data.librosmasprestado.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.libro + '</td>';
                    Contenido += '<td>' + item.Cantidad + '</td>';



                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#masPrestados").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const librosmenosprestado = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/librosmenosprestado',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodymenosPrestados');

                let Contenido = '';

                console.log(Data);

                Data.librosmenosprestado.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.libro + '</td>';
                    Contenido += '<td>' + item.Cantidad + '</td>';



                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#menosPrestados").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};
const librostasaprestado = function () {
    $.ajax({
        type: "POST",
        url: '../Metrica/librostasaprestado',
        success: function (Data) {
            if (Data) {

                const IndicadoresActiveDirectory = document.getElementById('tbodytasa');

                let Contenido = '';

                console.log(Data);

                Data.librostasaprestado.forEach(function (item) {
                    Contenido += '<tr>';
                    Contenido += '<td>' + item.tasa + '</td>';
                    



                    Contenido += '</tr>';
                });
                IndicadoresActiveDirectory.innerHTML = Contenido;
                $('[data-toggle="popover"]').popover();
                $("#tasa").DataTable({
                    "paging": false,
                    "language": Espanol,
                    "scrollY": "250px",
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });;
                setTimeout(function () {
                    document.getElementById('ContenedorIconoCarga').style.visibility = 'hidden';
                    document.getElementById('DivGris').style.visibility = 'hidden';

                }, 1000);
                document.getElementById('Historico_wrapper').setAttribute('class', 'dataTables_wrapper dt-bootstrap4 no-footer col-12');
            }
        }
    });


};







////