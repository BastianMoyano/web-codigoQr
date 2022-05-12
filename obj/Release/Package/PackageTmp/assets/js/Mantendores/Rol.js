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

const FetchWithData = (Url, Data) => {

    return new Promise(resolve => {
        return resolve(
            fetch(Url, {
                method: 'POST',
                body: JSON.stringify(Data),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(responsive => { return responsive; })
        );
    });
};

class LoadTable {
    constructor(table) {
        const Table = document.getElementById(table);
        this.state = {
            table: Table,
            body: Table.getElementsByTagName('tbody')[0]
        };
    }
    loadMulti(data, answer) {
        const { body } = this.state;
        answer ? body.innerHTML = '' : null;
        const comps = new Components();
        data.forEach(function (element) {
            body.appendChild(comps.LoadRow(element));
        });

    }
    loadUni(data) {
        const { body } = this.state;
        const comps = new Components();
        body.appendChild(comps.LoadRow(data));
    }


}

class LoadAjax {
    constructor(url, data) {
        this.state = {
            url: url,
            data: data
        };
    }
    loadNotData() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.state.url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }
    loadWhitData() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.state.url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(this.state.data);
        return xhr;
    }
}

function GetvalueRadio(crt) {
    for (let i = 0; i < crt.length; i++) {
        if (crt[i].checked) {
            return crt[i].value;
        }
    }
}

function dato(user, URL) {
    return new Promise(resolve => {
        return resolve(
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify({ Usuarios: user }),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json()).then(responsive => {
                return responsive;
            })
        );
    });
}
function fetch_condatos(datos, URL) {
    return new Promise(resolve => {
        return resolve(
            fetch(URL, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json()).then(responsive => responsive)
        );
    });
}


window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../Mantenedor/CargarTipoUsuario', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {

                var table = document.getElementById('Tabla_Roles');
                var tbody = table.getElementsByTagName('tbody')[0];
                for (var i = 0; i < resultado.Datos.length; i++) {
                    var cuerpo = '<tr>' +

                        '<td>' + resultado.Datos[i].NOMBRE_TIPO_USUARIO + '</td>' +
                        '<td>';
                    cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" id="ModificarRoles" value=' + resultado.Datos[i].ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Rol"><i class="fa fa-edit"></i></button>';
                    cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" id="VerPermiso" value=' + resultado.Datos[i].ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Ver Permiso"><i class="fas fa-archive"></i></button>';
                    if (resultado.Datos[i].ID_TIPO_USUARIO != 5 && resultado.Datos[i].ID_TIPO_USUARIO != 15) {
                        cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" onclick="ModalEliminar(this)" id=' + resultado.Datos[i].ID_TIPO_USUARIO + ' value=' + resultado.Datos[i].ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Eliminar Rol"><i class="fas fa-times"></i></button>';
                    }

                    cuerpo += '</td>' +
                        '</tr>';
                    tbody.innerHTML += cuerpo;
                }

                $('[data-toggle="popover"]').popover();
            }

            $('#Tabla_Roles').DataTable({
                "language": Espanol,
                drawCallback: function () {
                    $('.popoverButton').popover({
                        "html": true,
                        trigger: 'manual',
                        placement: 'left',
                        "content": function () {
                            return '<div  data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Rol"></div>';
                        }
                    })
                }
            });
        }
    };
    xhr.send();

    $("#AddRol").click(function () {
        $("#modal-Add-Rol").modal("show");


    });

    $("#BtnGuardarRol").click(function (e) {
        e.preventDefault();
        var Errores = 0;


        if ($("#ADD_Rol").val() === "") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe ingresar el Nombre',
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
            var MI_TIPO_USUARIOS = new Object();
            MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO = $("#ADD_Rol").val();

            var Enviar = JSON.stringify(MI_TIPO_USUARIOS);

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../Mantenedor/GuardarTipoUsuario',
                data: Enviar,
                success: function (d) {
                    if (d.RESPUESTA) {
                        $("#modal-Add-Rol").modal("hide");
                        $("#Tabla_Roles").DataTable().destroy();
                        var cuerpo = '<tr>' +

                            '<td>' + d.data.NOMBRE_TIPO_USUARIO + '</td>' +
                            '<td>';
                        cuerpo += '<button class="btn btn-outline-primary btn-sm" id="ModificarRoles" value=' + d.data.ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Rol"><i class="fa fa-edit"></i></button>';
                        cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" id="VerPermiso" value=' + d.data.ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Ver Permiso"><i class="fas fa-archive"></i></button>';
                        cuerpo += '<button class="btn btn-outline-primary btn-sm popoverButton" onclick="ModalEliminar(this)" id=' + d.data.ID_TIPO_USUARIO + ' value=' + d.data.ID_TIPO_USUARIO + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Eliminar Rol"><i class="fas fa-times"></i></button>';
                        cuerpo += '</td>' +
                            '</tr>';


                        document.getElementById("mod-datos").innerHTML += cuerpo;
                        $('[data-toggle="popover"]').popover();
                        $('#Tabla_Roles').DataTable({
                            "language": Espanol,
                            drawCallback: function () {
                                $('.popoverButton').popover({
                                    "html": true,
                                    trigger: 'manual',
                                    placement: 'left',
                                    "content": function () {
                                        return '<div  data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Rol"></div>';
                                    }
                                })
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
                            text: '<strong>Error!</strong><br /> Este Rol Existe',
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


    $(document).on('click', '#ModificarRoles', function (e) {
        e.preventDefault();
        var ID = $(this).val();

        $.ajax({
            type: 'POST',
            url: '../Mantenedor/ListaTipoUsuarioPorId',
            data: { 'id': parseInt(ID) },
            success: function (d) {
                if (d.RESPUESTA) {

                    var datos = d.datos;
                    console.log(datos);
                    $("#MOD_COD_Rol").val(datos[0].ID_TIPO_USUARIO).hide();
                    $("#Mod_Rol").val(datos[0].NOMBRE_TIPO_USUARIO);



                    $("#modal-Mod-Rol").modal("show");
                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });



    });


    $(document).on('click', '#BtnGuardarRolModificado', function (e) {
        e.preventDefault();
        var Errores = 0;


        if ($("#Mod_Rol").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar el Nombre del rol',
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
            var MI_TIPO_USUARIOS = new Object();
            MI_TIPO_USUARIOS.ID_TIPO_USUARIO = $("#MOD_COD_Rol").val();
            MI_TIPO_USUARIOS.NOMBRE_TIPO_USUARIO = $("#Mod_Rol").val();



            var Enviar = JSON.stringify(MI_TIPO_USUARIOS);


            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../Mantenedor/ModificarTipoUsuario',
                data: Enviar,
                success: function (d) {
                    if (d.RESPUESTA) {
                        console.log(d);
                        $("#modal-Mod-Rol").modal("hide");
                        $("#Tabla_Roles").DataTable().destroy();
                        var table = document.getElementById('Tabla_Roles');
                        var tbody = table.getElementsByTagName('tbody')[0];
                        for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {

                            var fila = tbody.getElementsByTagName('tr')[i];
                            var Celda = fila.getElementsByTagName('td')[1];
                            var btun = Celda.getElementsByTagName('button')[0];

                            console.log(d.data);
                            if (Number(btun.value) === d.data.ID_TIPO_USUARIO) {


                                fila.getElementsByTagName('td')[0].innerText = d.data.NOMBRE_TIPO_USUARIO;



                            }

                        }
                        $('[data-toggle="popover"]').popover();
                        $('#Tabla_Roles').DataTable({
                            "language": Espanol,
                            drawCallback: function () {
                                $('.popoverButton').popover({
                                    "html": true,
                                    trigger: 'manual',
                                    placement: 'left',
                                    "content": function () {
                                        return '<div  data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar Rol"></div>';
                                    }
                                })
                            }
                        });



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


                    } else if (d == 2) {
                        Swal.fire({
                            title: "Advertencia, session expirada!",
                            text: "Debe iniciar sesión nuevamente!",
                            icon: "warning"
                        }).then((willDelete) => {
                            window.location.href = '../Login/index';
                        });
                    }
                    else {
                        new Noty({
                            text: '<strong>Error!</strong><br />No se pudo guardar.',
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
    $(document).on('click', '#VerPermiso', async function (e) {
        e.preventDefault();
        var ID = $(this).val();

        $.ajax({
            type: 'POST',
            url: '../Mantenedor/ListaTipoUsuarioPorId',
            data: { 'id': ID },
            success: function (d) {
                if (d.RESPUESTA) {

                    var datos = d.datos;
                    console.log(datos);

                    $("#MOD_ID").val(datos[0].ID_TIPO_USUARIO).hide();


                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });
        const resultado = await dato(this.value, '../Mantenedor/Modulos');
        const tbody = document.getElementById("modulos_sub");
        tbody.innerHTML = "";
        for (var i = 0; i < resultado[0].length; i++) {

            var Tr = document.createElement("tr");

            var tdModulo = document.createElement("td");
            var tdcheck = document.createElement("td");
            tdModulo.style.borderRight = '1px solid gray';

            var input = document.createElement("input");

            input.type = "checkbox";
            input.className = 'apro modulo';
            input.value = resultado[0][i].Codigo;
            input.id = resultado[0][i].MiNombre;
            if (resultado[0][i].Ckeck === 'checked') {
                input.setAttribute('onchange', 'oo(this)');
                input.checked = true;
            } else {
                input.setAttribute('onchange', 'oo(this)');
            }

            let etiq = document.createElement('label');
            let etiq1 = document.createElement('label');

            etiq.setAttribute('for', resultado[0][i].MiNombre);
            etiq1.appendChild(document.createTextNode(resultado[0][i].MiNombre));
            etiq1.style.marginLeft = "35px";
            tdModulo.appendChild(input);
            tdModulo.appendChild(input);
            tdModulo.appendChild(etiq);
            tdModulo.appendChild(etiq1);


            //  Tr.appendChild(tdcheck);
            Tr.appendChild(tdModulo);



            let data = resultado[1];

            const result = data.filter(data => data.Cod_modulo === resultado[0][i].Codigo);

            if (result.length !== 0) {
                let cont = 0;
                var tdCompletar = document.createElement("td");
                for (var x = 0; x < result.length; x++) {
                    cont++;
                    tdcheck = document.createElement("td");
                    tdSubModulo = document.createElement("td");

                    input = document.createElement("input");
                    input.type = "checkbox";
                    input.className = 'apro submodulo';
                    input.id = result[x].MiNombre;
                    input.value = result[x].Codigo;
                    if (result[x].Ckeck === 'checked') {
                        input.checked = true;
                    } else {
                        let Valido = resultado[0][i].Ckeck === 'checked' ? false : true;
                        input.disabled = Valido;
                    }
                    let etiq = document.createElement('label');
                    etiq.setAttribute('for', result[x].MiNombre);
                    tdcheck.appendChild(input);
                    tdcheck.appendChild(etiq);
                    tdSubModulo.innerText = result[x].MiNombre;
                    //tdSubModulos.colSpan = 2;
                    //tdCompletar.colSpan = 2;

                    tdcheck.style.borderLeft = '1px solid gray';
                    Tr.appendChild(tdcheck);
                    Tr.appendChild(tdSubModulo);

                    cont++;
                }

                if (cont !== 22) {
                    tdCompletar.innerText = "";
                    tdCompletar.colSpan = 22 - cont;
                    tdCompletar.style.borderLeft = '1px solid gray';
                    Tr.appendChild(tdCompletar);

                }



            } else {
                var tdSubModulos = document.createElement("td");
                tdSubModulos.innerText = "No contiene sub modulos";
                tdSubModulos.style.paddingTop = '19px';
                tdSubModulos.colSpan = 22;
                tdSubModulos.style.borderLeft = '1px solid gray';
                Tr.appendChild(tdSubModulos);
            }
            tbody.appendChild(Tr);

        }


        $("#modal-Mod-Permiso").modal("show");

    });

});


const btnAddUser1 = document.getElementById("BtnGuardarPermiso");

btnAddUser1.addEventListener("click", async function (e) {
    e.preventDefault();
    $("#TablaUsuarios").dataTable().fnDestroy();
    const tbodys = document.getElementById("modulos_sub");
    const trs = tbodys.getElementsByTagName('tr');
    var moduloss = [];
    var submoduloss = [];
    for (var i = 0; i < trs.length; i++) {

        var checkeados = trs[i].getElementsByClassName('modulo');
        var checkeados1 = trs[i].getElementsByClassName('submodulo');


        for (var j = 0; j < checkeados.length; j++) {
            if (checkeados[j].checked) {
                var modulo = checkeados[j].value;
                moduloss.push(modulo);


            }
        }

        for (var p = 0; p < checkeados1.length; p++) {
            if (checkeados1[p].checked) {
                var modulo3 = checkeados1[p].value;
                submoduloss.push(modulo3);


            }
        }
    }



    const AgregarModulo = { us: document.getElementById("MOD_ID").value, modulos: moduloss, sub_modulos: submoduloss };
    const resutado = await fetch_condatos(AgregarModulo, '../Mantenedor/AddPermiso');
    if (resutado.answer == false) {
        new Noty({
            text: '<strong>Información</strong><br /> Error.<br /> Error al creador.',
            type: 'error',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    } else {

        new Noty({
            text: '<strong>Información</strong><br /> Permiso Creado Exitosamente.',
            type: 'success',
            theme: 'sunset',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

        $("#modal-Mod-Permiso").modal("hide");

    }

});

function oo(check) {
    const td = check.parentNode;
    const tr = td.parentNode;
    const tds = tr.getElementsByTagName('input');
    for (let i = 1; i < tds.length; i++) {
        if (check.checked) {
            tds[i].disabled = false;


        } else {

            tds[i].disabled = true;
            tds[i].checked = false;


        }
    }
}
const ModalEliminar = btnEliminar => {

    $('#modal_eliminar').modal('show');

    document.getElementById("EliminarUsuarioM").value = btnEliminar.value;

    document.getElementById("EliminarUsuarioM").name = btnEliminar.id;
};



const EliminarUsuario = btnEliminar2 => {


    var IdUsuario = btnEliminar2.value;


    $.ajax({
        type: 'POST',
        url: '../Mantenedor/EliminarRol',
        data: { IdUsuario: IdUsuario },
        success: function (d) {

            if (d.RESPUESTA) {
                rowIndex = btnEliminar2.name;
                $('#modal_eliminar').modal('hide');

                var row = document.getElementById(rowIndex).parentNode.parentNode;
                $('#Tabla_Roles').dataTable().fnDeleteRow(row);

            } else if (d == 2) {
                Swal.fire({
                    title: "Advertencia, session expirada!",
                    text: "Debe iniciar sesión nuevamente!",
                    icon: "warning"
                }).then((willDelete) => {
                    window.location.href = '../Login/index';
                });
            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });

};


