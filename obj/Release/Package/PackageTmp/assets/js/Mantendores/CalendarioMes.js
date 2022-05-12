





let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");
let diasSemana_orden = new Array("LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM");
let meses = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");

var bouncejsShow = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 450, y: 0 }, to: { x: 0, y: 0 },
            easing: 'bounce',
            bounces: 4,
            duration: 1000,
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
$(document).ready(function (e) {


    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../CalendarioMateria/ListaCalendarioMateria', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {


                console.log(resultado);



                for (var i = 0; i < resultado.Datos.length; i++) {
                    var aux = document.getElementById("Turno");
                    var option = document.createElement("option");
                    option.value = resultado.Datos[i].ID_MATERIA;
                    option.text = resultado.Datos[i].DESCRIPCION;
                    aux.add(option);
                }

            }

        }
    };

    xhr.send();



    function GenerarTable(mes) {


        var tabla = document.createElement('table');
        var th = document.createElement('th');
        var fila = document.createElement('tr');
        var thead = document.createElement('thead');
        tabla.className = 'table table-hover table-bordered table-striped';

        th.colSpan = 7;
        th.appendChild(document.createTextNode(mes));
        fila.appendChild(th);
        thead.appendChild(fila);
        fila = document.createElement('tr');



        for (var i = 0; i < diasSemana_orden.length; i++) {

            var celda = document.createElement('th');
            celda.appendChild(document.createTextNode(diasSemana_orden[i]));
            fila.appendChild(celda);


        }
        thead.appendChild(fila);
        tabla.appendChild(thead);

        return tabla;
    }



    $(document).on('click', '.dia_mes', function (e) {
        e.preventDefault();
        var id_turno = $("#Turno").val();
        var mes_ = $(this).val();

        var Enviar = JSON.stringify({ "Tipo": 1, "Dato": mes_, "Id_turno": parseInt(id_turno) });

        console.log(Enviar);

        $("#MES_CALENDARIO").text($(this).find('span')[0].innerText);
        $("#Panel_Mes_Calendario").show();


        const fecha = new Date($('#ANO').text() + '/' + mes_ + ' / 01');
        let Domingo = [];
        let Lunes = [];
        let Martes = [];
        let Miercoles = [];
        let Jueves = [];
        let Viernes = [];
        let Sabado = [];
        let Calendario = [];

        var mes = fecha.getMonth();

        while (fecha.getMonth() === mes) {
            Calendario.push({ "DIA": diasSemana[fecha.getDay()], "Fecha": new Date(fecha) });
            fecha.setDate(fecha.getDate() + 1);
        }


        var contador = 1;
        var cuerpo = "";
        var table = document.getElementById('tabla_Calendario');
        var tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = "";
        var fila = document.createElement('tr');
        var celda = document.createElement('td');
        var butt = document.createElement('button');
        butt.className = "btn btn-sm btn-outline-success";

        for (var i = 0; i < Calendario.length; i++) {
            celda = document.createElement('td');
            var separacion = Calendario[i].Fecha.getDate();
            butt = document.createElement('button');
            butt.className = "btn btn-sm btn-danger active cont";
            butt.style.width = '100%';
            butt.id = separacion;
            butt.value = Calendario[i].Fecha;
            var texto = document.createTextNode(separacion);
            butt.appendChild(texto);

            switch (Calendario[i].DIA) {

                case "Lunes":
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Martes":
                    if (fila.childNodes.length === 0) {

                        for (var l = 0; l < 1; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }

                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Miercoles":
                    if (fila.childNodes.length === 0) {
                        for (l = 0; l < 2; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Jueves":
                    if (fila.childNodes.length === 0) {
                        for (l = 0; l < 3; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Viernes":
                    if (fila.childNodes.length === 0) {
                        for (l = 0; l < 4; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Sabado":
                    if (fila.childNodes.length === 0) {
                        for (l = 0; l < 5; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    break;
                case "Domingo":

                    if (fila.childNodes.length === 0) {
                        for (l = 0; l < 6; l++) {
                            fila.appendChild(celda);
                            celda = document.createElement('td');
                        }
                    }
                    celda.appendChild(butt);
                    fila.appendChild(celda);
                    tbody.appendChild(fila);
                    fila = document.createElement('tr');
                    break;
            }
        }
        tbody.appendChild(fila);

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '../Mantenedor/GetDateCalendar',
            data: Enviar,
            success: function (d) {
                if (d.RESPUESTA) {

                    console.log(d);
                    if (d.datos.length > 0) {

                        for (var i = 0; i < d.datos.length; i++) {

                            const f1 = new Date(moment(d.datos[i].FECHA_INICIO).format("YYYY/MM/DD"));
                            const f2 = new Date(moment(d.datos[i].FECHA_TERMINO).format("YYYY/MM/DD"));


                            while (f1 <= f2) {

                                for (var j = 0; j < tbody.getElementsByTagName('tr').length; j++) {


                                    var fila = tbody.getElementsByTagName('tr')[j];

                                    for (var l = 0; l < fila.getElementsByTagName('td').length; l++) {

                                        var celda = fila.getElementsByTagName('td')[l];
                                        var button = celda.getElementsByTagName('button')[0];
                                        if (button !== undefined) {


                                            let comparacion = new Date(button.value);
                                            let comparacion2 = new Date(f1);


                                            if (comparacion.getTime() === comparacion2.getTime()) {
                                                console.log(comparacion);
                                                console.log(comparacion2);
                                                button.classList.remove('btn-danger');
                                                button.classList.add('btn-info');
                                            }

                                        }
                                    }

                                }
                                f1.setDate(f1.getDate() + 1);
                            }

                        }

                    }

                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });


    });

    $(document).on('click', '#AnoSelect', function (e) {

        e.preventDefault();
        document.getElementById('Contenido_Calendario').innerHTML = '';


        var id_turno = $("#Turno").val();

        var ANO = $('#ANO').text();

        var Enviar = JSON.stringify({ "Tipo": 2, "Dato": ANO, "Id_turno": parseInt(id_turno) });

        $("#MES_CALENDARIO").text($(this).find('span')[0].innerText);



        const fecha = new Date(ANO + '/01/01');
        let Domingo = [];
        let Lunes = [];
        let Martes = [];
        let Miercoles = [];
        let Jueves = [];
        let Viernes = [];
        let Sabado = [];
        let Calendario = [];


        var mes = fecha.getMonth();
        var ano = fecha.getFullYear();


        while (fecha.getFullYear() === ano) {

            const Tabla = GenerarTable(meses[mes]);


            let fila = document.createElement('tr');
            let tbody = document.createElement('tbody');

            while (fecha.getMonth() === mes) {
                Calendario.push({ "DIA": diasSemana[fecha.getDay()], "Fecha": new Date(fecha), "ultimo": new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0) });


                var celda = document.createElement('td');

                var separacion = fecha.getDate();

                let butt = document.createElement('button');
                butt.className = "btn btn-sm btn-danger active cont";
                butt.style.width = '100%';
                butt.id = separacion;
                butt.style.fontSize = "8px";
                butt.value = fecha;

                var texto = document.createTextNode(separacion);

                butt.appendChild(texto);

                switch (diasSemana[fecha.getDay()]) {

                    case "Lunes":
                        celda.appendChild(butt);
                        fila.appendChild(celda);
                        break;
                    case "Martes":

                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 1; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }
                        celda.appendChild(butt);
                        fila.appendChild(celda);


                        break;
                    case "Miercoles":


                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 2; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }
                        celda.appendChild(butt);
                        fila.appendChild(celda);


                        break;
                    case "Jueves":


                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 3; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }
                        celda.appendChild(butt);
                        fila.appendChild(celda);


                        break;
                    case "Viernes":

                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 4; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }
                        celda.appendChild(butt);
                        fila.appendChild(celda);

                        break;
                    case "Sabado":
                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 5; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }
                        celda.appendChild(butt);
                        fila.appendChild(celda);




                        break;
                    case "Domingo":

                        if (fila.childNodes.length === 0) {
                            for (l = 0; l < 6; l++) {
                                fila.appendChild(celda);
                                celda = document.createElement('td');
                            }
                        }

                        celda.appendChild(butt);
                        fila.appendChild(celda);
                        tbody.appendChild(fila);
                        fila = document.createElement('tr');

                }
                fecha.setDate(fecha.getDate() + 1);
            }


            mes += 1;

            var div = document.createElement('div');
            div.className = 'col-lg-4';
            var hijos = fila.childNodes.length;


            if (hijos < 7 && hijos !== 0) {
                console.log(hijos);
                for (var i = hijos; i < 7; i++) {
                    celda = document.createElement('td');
                    fila.appendChild(celda);

                }

            }

            var padre = document.getElementById('Contenido_Calendario');

            tbody.appendChild(fila);
            Tabla.appendChild(tbody);
            div.appendChild(Tabla);
            padre.appendChild(div);



        }

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            type: 'POST',
            url: '../CalendarioMateria/GetDateCalendar',
            data: Enviar,
            success: function (d) {
                if (d.RESPUESTA) {
                    var inicio = document.getElementById('Contenido_Calendario');
                    console.log(d);
                    if (d.datos.length > 0) {

                        for (var i = 0; i < d.datos.length; i++) {

                            const f1 = new Date(moment(d.datos[i].FECHA).format("YYYY/MM/DD"));



                            for (var a = 0; a < inicio.getElementsByTagName('table').length; a++) {

                                var tabla = inicio.getElementsByTagName('table')[a];

                                for (var b = 0; b < tabla.getElementsByTagName('tbody').length; b++) {

                                    var tbody = tabla.getElementsByTagName('tbody')[b];


                                    for (var c = 0; c < tbody.getElementsByTagName('tr').length; c++) {

                                        var fila = tbody.getElementsByTagName('tr')[c];

                                        for (var f = 0; f < fila.getElementsByTagName('td').length; f++) {


                                            var celda = fila.getElementsByTagName('td')[f];

                                            var button = celda.getElementsByTagName('button')[0];

                                            if (button !== undefined) {

                                                let comparacion = moment(button.value).format("YYYY/MM/DD");
                                                let comparacion2 = moment(f1).format("YYYY/MM/DD");

                                                if (comparacion === comparacion2) {

                                                    button.classList.remove('btn-danger');
                                                    button.classList.add('btn-success');
                                                    button.classList.add('Guardado');
                                                }





                                            }

                                        }
                                    }
                                }




                            }




                            f1.setDate(f1.getDate() + 1);



                            //for (var j = 0; j < padre.getElementsByTagName('tr').length; j++) {


                            //    var fila = tbody.getElementsByTagName('tr')[j];

                            //    for (var l = 0; l < fila.getElementsByTagName('td').length; l++) {

                            //        var celda = fila.getElementsByTagName('td')[l];
                            //        var button = celda.getElementsByTagName('button')[0];
                            //        if (button !== undefined) {


                            //            let comparacion = new Date(button.value);
                            //            let comparacion2 = new Date(f1);


                            //            if (comparacion.getTime() === comparacion2.getTime()) {
                            //                console.log(comparacion);
                            //                console.log(comparacion2);
                            //                button.classList.remove('btn-danger');
                            //                button.classList.add('btn-info');
                            //            }

                            //        }
                            //    }

                            //}



                        }

                    }

                }
            },
            failure: function (response) {
                alert("Fallo");
            }
        });
    });

    var clase_cambiante;

    $(document).on('click', '#ACTIVO', function (e) {
        $(this).addClass('active');
        clase_cambiante = 'Guardar';
    });


    $(document).on('click', '#INACTIVO', function (e) {

        $(this).addClass('active');
        clase_cambiante = 'Borrar';
    });


    $(document).on('click', '.cont', function (e) {
        e.preventDefault();

        if (clase_cambiante === "Guardar") {
            if (!$(this).hasClass(clase_cambiante)) {
                $(this).removeClass('btn-success btn-info btn-danger Borrar');
                $(this).addClass('btn-success ' + clase_cambiante);
                if ($(this).hasClass("Guardado")) {
                    $(this).removeClass('Guardado');
                }
            }

        }
        else if (clase_cambiante === "Borrar") {
            if (!$(this).hasClass(clase_cambiante)) {
                $(this).removeClass('btn-success btn-info btn-danger Guardado');
                $(this).addClass('btn-danger ' + clase_cambiante);
                if ($(this).hasClass("Guardado")) {
                    $(this).removeClass('Guardado');
                }
            }

        }






    });
});


function Guardar() {


    var PADRE = document.getElementById('Contenido_Calendario');
    var count = PADRE.getElementsByTagName('div');


    for (var j = 0; j < count.length; j++) {

        var table2 = count[j].getElementsByTagName('table')[0];

        var tbody = table2.getElementsByTagName('tbody')[0];
        var Fecha = null;


        var CALENDARIO_MATERIA = [];
        var BorradoCalendarioTurno = [];

        for (var i = 0; i < tbody.getElementsByTagName('tr').length; i++) {
            var fila = tbody.getElementsByTagName('tr')[i];
            for (var l = 0; l < fila.getElementsByTagName('td').length; l++) {
                var celda = fila.getElementsByTagName('td')[l];
                var button = celda.getElementsByTagName('button')[0];
                if (button !== undefined) {

                    if (button.classList.contains('Guardar')) {
                        Fecha = new Date(button.value);
                        CALENDARIO_MATERIA.push({ "ID_MATERIA": Number($("#Turno").val()), "FECHA": moment(Fecha).format("YYYY/MM/DD"), "ID_ESTADO":1});
                        button.classList.add('Guardado');
                        button.classList.remove('Guardar');
                    }
                    else if (button.classList.contains('Borrar')) {
                        Fecha = new Date(button.value);
                        BorradoCalendarioTurno.push({ "ID_MATERIA": Number($("#Turno").val()), "FECHA": moment(Fecha).format("YYYY/MM/DD") });
                        button.classList.add('Borrado');
                        button.classList.remove('Borrar');
                    }

                }
            }
        }


        if (CALENDARIO_MATERIA.length > 0 || BorradoCalendarioTurno.length > 0) {
            var Enviar = JSON.stringify({ CALENDARIO_MATERIA, "MES": j, BorradoCalendarioTurno });


            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../CalendarioMateria/GuardarCalendarioTurnos',
                data: Enviar,
                success: function (d) {
                    if (d.RESPUESTA) {

                        new Noty({
                            text: '<strong>Información</strong><br /> Guardado mes de ' + meses[d.MES] + '!',
                            type: 'success',
                            theme: 'sunset',
                            layout: 'topRight',
                            timeout: 4000,
                            animation: {
                                open: bouncejsShow,
                                close: bouncejsClose
                            }
                        }).show();

                        console.log(meses[j]);
                        console.log(j);
                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });
        }
        else {
            new Noty({
                text: '<strong>Información</strong><br />No se ha seleccionado nada para guardar o borrar',
                type: 'warning',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }



    }











}



