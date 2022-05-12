
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
    "sInfo": "Mostrando registros" +
        "<br/> del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros" + "<br/> del 0 al 0 de un total de 0 registros",
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
window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../Periodo/ListarPeriodo', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {

                var table = document.getElementById('tbperiodo');
                var tbody = table.getElementsByTagName('tbody')[0];
                for (var i = 0; i < resultado.Datos.length; i++) {
                    var cuerpo = '<tr>' +
                        '<td>' + resultado.Datos[i].DESCRIPCION +'</td>' +
                        '<td>' + moment(resultado.Datos[i].FECHA_INICIO).format("DD-MM-YYYY") + '</td>' +
                        '<td>' + moment(resultado.Datos[i].FECHA_FIN).format("DD-MM-YYYY")+ '</td>'
                    

                    cuerpo += '<td>' + resultado.Datos[i].ID_ESTADO + '</td>';

                    cuerpo += '<td>';
                    cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" id="ModificarPeriodo" value=' + resultado.Datos[i].IDPERIODO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Periodo"><i class="fa fa-edit"></i></button>';
                    cuerpo += '</td>' +
                        '</tr>';
                    tbody.innerHTML += cuerpo;
                }


                $('[data-toggle="popover"]').popover();
            }

            $('#tbperiodo').DataTable({
                "language": Espanol,
                drawCallback: function () {
                    $('.popoverButton').popover({
                        "html": true,
                        trigger: 'manual',
                        placement: 'left',
                        "content": function () {
                            //return '<div  data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Parentesco"></div>';
                        }
                    })
                }
            });

        }
    };
    xhr.send();

 


    $("#AddPeriodo").click(function () {
        $("#modal-Add-Periodo").modal("show");
        document.getElementById("Add_Periodo").value = '';
        document.getElementById("Add_Fecha").value = '';
        document.getElementById("Add_Estado").value = '0';

    });

    $("#BtnGuardarPeriodo").click(function (e) {
        e.preventDefault();
        var Errores = 0;


        if ($("#Add_Periodo").val() === "") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe ingresar el Periodo ',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
        if ($("#Add_Fecha").val() === "") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe Seleccione Fecha',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
        if ($("#Add_Estado").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar la  Estado',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }


        if (Errores === 0) {
            const datos = new FormData();
            const DESCRIPCION = $("#Add_Periodo").val();
            const FECHA_INICIO = $("#Add_Fecha").val();
            const ID_ESTADO = Number($("#Add_Estado").val());
            datos.append("DESCRIPCION", DESCRIPCION);
            datos.append("FECHA_INICIO", FECHA_INICIO);
            datos.append("ID_ESTADO", Number(ID_ESTADO));
           

            $.ajax({
                processData: false,
                contentType: false,
                type: 'POST',
                url: '../Periodo/GuardarPeriodo',
                data: datos,
                success: function (d) {
                    if (d.RESPUESTA) {
                        $("#modal-Add-Periodo").modal("hide");
                        $("#tbperiodo").DataTable().destroy();
                        var cuerpo = '<tr>' +
                            '<td>' + d.data.DESCRIPCION + '</td>' +
                            '<td>' + moment(d.data.FECHA_INICIO).format("DD-MM-YYYY") + '</td>' +
                            '<td>' + moment(d.data.FECHA_FIN).format("DD-MM-YYYY") + '</td>'


                        cuerpo += '<td>' + d.data.ID_ESTADO + '</td>';

                        cuerpo += '<td>';
                        cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" id="ModificarPeriodo" value=' + d.data.IDPERIODO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Periodo"><i class="fa fa-edit"></i></button>';
                        cuerpo += '</td>' +
                            '</tr>';


                        document.getElementById("mod-datos").innerHTML += cuerpo;
                        $('#tbperiodo').DataTable({
                            "language": Espanol,
                            destroy: true,
                            scrollX: true,
                            "aaSorting": [],
                            fixedHeader: {
                                header: true,
                                footer: true
                            }
                        });

                        new Noty({
                            text: '<strong>Información</strong><br /> Guardado!.',
                            type: 'success',
                            theme: 'sunset',
                            layout: 'topRight',
                            timeout: 4000,
                            animation: {
                                open: bouncejsShow,
                                close: bouncejsClose
                            }
                        }).show();


                    } else if (d == 2) {
                        Swal.fire({
                            title: "Advertencia, session expirada!",
                            text: "Debe iniciar sesión nuevamente!",
                            icon: "warning"
                        }).then((willDelete) => {
                            window.location.href = '../Login/index';
                        });
                    } else {
                        new Noty({
                            text: '<strong>Error</strong><br /> Ya existe esta Periodo!.',
                            type: 'error',
                            theme: 'sunset',
                            layout: 'topRight',
                            timeout: 4000,
                            animation: {
                                open: bouncejsShow,
                                close: bouncejsClose
                            }
                        }).show();
                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });



        }

    });

    $(document).on('click', '#ModificarPeriodo', function (e) {
        e.preventDefault();
        var ID = $(this).val();

        $.ajax({
            type: 'POST',
            url: '../Periodo/ListaPeriodo_con_Id',
            data: { 'id': parseInt(ID) },
            success: function (d) {
                if (d.RESPUESTA) {

                    var datos = d.datos;
                    $("#Mod_codPeriodo").val(datos[0].IDPERIODO).hide();
                    $("#Mod_Periodo").val(datos[0].DESCRIPCION);
                    $("#Mod_Fecha").val(moment(datos[0].FECHA_INICIO).format('DD/MM/YYYY') + "-" + moment(datos[0].FECHA_FIN).format('DD/MM/YYYY'));
                    $("#Mod_Estado").val(datos[0].ID_ESTADO);
                    $("#modal-Mod-Periodo").modal("show");
                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });



    });

    $(document).on('click', '#BtnGuardarPeridoModificado', function (e) {
        e.preventDefault();
        var Errores = 0;


        if ($("#Mod_Periodo").val() === "") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe ingresar el Periodo ',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
        if ($("#Mod_Fecha").val() === "") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe Seleccione Fecha',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
        if ($("#Mod_Estado").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar la  Estado',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }


        if (Errores === 0) {
            const datos = new FormData();
            const IDPERIODO = Number($("#Mod_codPeriodo").val());
            const DESCRIPCION = $("#Mod_Periodo").val();
            const FECHA_INICIO = $("#Mod_Fecha").val();
            const ID_ESTADO = Number($("#Mod_Estado").val());
            datos.append("IDPERIODO", Number(IDPERIODO));
            datos.append("DESCRIPCION", DESCRIPCION);
            datos.append("FECHA_INICIO", FECHA_INICIO);
            datos.append("ID_ESTADO", Number(ID_ESTADO));


            $.ajax({
                processData: false,
                contentType: false,
                type: 'POST',
                url: '../Periodo/ModificarPerido',
                data: datos,
                success: function (d) {
                    if (d.RESPUESTA) {
                        $("#modal-Mod-Periodo").modal("hide");
                        $("#tbperiodo").DataTable().destroy();
                        var table = document.getElementById('tbperiodo');
                        var tbody = table.getElementsByTagName('tbody')[0];
                        for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {

                            var fila = tbody.getElementsByTagName('tr')[i];
                            var Celda = fila.getElementsByTagName('td')[4];
                            var btun = Celda.getElementsByTagName('button')[0];


                            if (Number(btun.value) === d.data.IDPERIODO) {

                                //fila.getElementsByTagName('td')[0].innerText = d.data.COD_COMUNA;
                                fila.getElementsByTagName('td')[0].innerText = d.data.DESCRIPCION;
                                fila.getElementsByTagName('td')[1].innerText = moment(d.data.FECHA_INICIO).format("DD-MM-YYYY") ;
                                fila.getElementsByTagName('td')[2].innerText = moment(d.data.FECHA_FIN).format("DD-MM-YYYY");
                                fila.getElementsByTagName('td')[3].innerText = d.data.ID_ESTADO;


                            }
                        }
                        $('#tbperiodo').DataTable({
                            "language": Espanol,
                            destroy: true,
                            scrollX: true,
                            "aaSorting": [],
                            fixedHeader: {
                                header: true,
                                footer: true
                            }
                        });
                        switch (d.TIPO) {
                            case 1:
                                new Noty({
                                    text: '<strong>Información</strong><br /> Guardado correctamente.',
                                    type: 'success',
                                    theme: 'sunset',
                                    layout: 'topRight',
                                    timeout: 4000,
                                    animation: {
                                        open: bouncejsShow,
                                        close: bouncejsClose
                                    }
                                }).show();
                                break;

                            case 2:
                                new Noty({
                                    text: '<strong>Información</strong><br />Solo se pudo guardar el Region, ya que La comuna existe.',
                                    type: 'success',
                                    theme: 'sunset',
                                    layout: 'topRight',
                                    timeout: 4000,
                                    animation: {
                                        open: bouncejsShow,
                                        close: bouncejsClose
                                    }
                                }).show();
                                break;

                        }


                    } else if (d == 2) {
                        Swal.fire({
                            title: "Advertencia, session expirada!",
                            text: "Debe iniciar sesión nuevamente!",
                            icon: "warning"
                        }).then((willDelete) => {
                            window.location.href = '../Login/index';
                        });
                    } else {

                        new Noty({
                            text: '<strong>Error</strong><br /> Ya existe esta comuna!.',
                            type: 'error',
                            theme: 'sunset',
                            layout: 'topRight',
                            timeout: 4000,
                            animation: {
                                open: bouncejsShow,
                                close: bouncejsClose
                            }
                        }).show();

                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });
        }




    });

});


$(function () {


    $('#Add_Fecha').daterangepicker({
        timePicker: false,

        "locale": {
            format: "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "DE",
            "toLabel": "HASTA",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sáb"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            //"firstDay": 1
        }
    });
    $('#Mod_Fecha').daterangepicker({
        timePicker: false,

        "locale": {
            format: "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "DE",
            "toLabel": "HASTA",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sáb"
            ],
            "monthNames": [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            //"firstDay": 1
        }
    });
  
});
