
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
//window.addEventListener("load", function () {

//    //LISTA DE ESPECIALIDADES.
//    var xhr = new XMLHttpRequest();

//    xhr.open('POST', '../Prueba/pruebauser', true);
//    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            var resultado = JSON.parse(xhr.responseText);
//            if (resultado.RESPUESTA) {
//                console.log(resultado.DETALLE);

//                var table = document.getElementById('tabla');
//                var tbody = table.getElementsByTagName('tbody')[0];
//                for (var i = 0; i < resultado.DETALLE.length; i++) {
//                    var cuerpo = '<tr>' +
//                        '<td>' + resultado.DETALLE[i].id + '</td>' +
//                        '<td>' + resultado.DETALLE[i].name + '</td>' +
//                        '<td>' + resultado.DETALLE[i].username + '</td>' +
//                        '<td>' + resultado.DETALLE[i].email + '</td>' +
//                        '<td>';
//                    cuerpo += '<button class="btn btn-outline-primary btn-sm" id="ModificarPais" value=' + resultado.DETALLE[i].id + ' data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="Modificar pais"><i class="fa fa-edit"></i></button>';
//                    cuerpo += '</td>' +
//                        '</tr>';
//                    tbody.innerHTML += cuerpo;

//                    $('[data-toggle="popover"]').popover();
//                }


//            }
//        }
//    };
//    xhr.send();



//});

$(document).ready(function () {
    var table = $('#tabla').DataTable({
        "ajax": "../Prueba1/pruebauser",
        "dataSrc": "",
        "columns": [
            { "data": "ProveedoresID" },
            { "data": "ProveedoresPersona" },
            { "data": "ProveedoresResposable" },
            { "data": "ProveedoresLinea" },
            { "data": "ProveedoresTelefono" },
            { "data": "ProveedoresCelular" },


        ],
        rowId: "id",
        "columnDefs": [{
            "targets": 6,
            "data": null,
            "defaultContent": '<button id="idglosas" class="btn btn-sm btn-success MostrarTp"><i class="fa fa-edit"></i></button>'
        }],
        responsive: true
    });

    $('table').on('click', '#idglosas', function () {
        var idtabla = table.row($(this).parents('tr')).id();
        console.log(idtabla);

    })
});

