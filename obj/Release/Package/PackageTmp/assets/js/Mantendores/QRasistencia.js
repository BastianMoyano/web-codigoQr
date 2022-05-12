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

function InicioEstacionamiento() {
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: '../Profesor/ListaAsingacionMateriaProfesor',
        success: function (resultado) {
            if (resultado.RESPUESTA) {

                document.getElementById("Add_Seccion").innerHTML.value = 0;
                //document.getElementById("Add_Seccion").innerHTML = '';

                for (var i = 0; i < resultado.datos.length; i++) {
                    var aux = document.getElementById("Add_Seccion");
                    var option = document.createElement("option");
                    option.value = resultado.datos[i].Seccion.ID_SECCION;
                    option.text = resultado.datos[i].Seccion.SECCION1;
                        
                    aux.add(option);



                }


            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });
}
window.addEventListener("load", function () {

    InicioEstacionamiento();

    document.getElementById('Add_Seccion').addEventListener('change', function () {

        if ($("#Add_Seccion")[0].selectedIndex !== 0) {

            const Seccion = document.getElementById('Add_Seccion').value;

            $.ajax({
                type: 'POST',
                url: '../Profesor/ListaSeccion',
                data: { Seccion: Seccion },
                success: function (resultado) {

                    if (resultado.RESPUESTA) {

                        document.getElementById("Add_Meteria").innerHTML.value = 0;
                        //document.getElementById("Add_Meteria").innerHTML = '';

                        for (var i = 0; i < resultado.datos.length; i++) {
                            var aux = document.getElementById("Add_Meteria");
                            var option = document.createElement("option");
                            option.value = resultado.datos[i].MATERIA.ID_MATERIA;
                            option.text = resultado.datos[i].MATERIA.DESCRIPCION;

                            aux.add(option);



                        }


                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });

        }

    });

    document.getElementById('Add_Meteria').addEventListener('change', function () {

        if ($("#Add_Meteria")[0].selectedIndex !== 0) {

            const Materia = document.getElementById('Add_Meteria').value;

            $.ajax({
                type: 'POST',
                url: '../Profesor/ListaDiaMateria',
                data: { Materia: Materia },
                success: function (resultado) {

                    if (resultado.RESPUESTA) {

                        document.getElementById("Add_DIA").innerHTML.value = 0;
                        //document.getElementById("Add_Meteria").innerHTML = '';

                        for (var i = 0; i < resultado.datos.length; i++) {
                            var aux = document.getElementById("Add_DIA");
                            var option = document.createElement("option");
                            option.value = resultado.datos[i].ID_CALENDARIOMATERIA;
                            option.text = moment(resultado.datos[i].FECHA).format("DD-MM-YYYY");

                            aux.add(option);



                        }


                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });

        }

    });

    $("#Add_Entrasda_Salida").click(function (e) {
        e.preventDefault();
        var Errores = 0;




        if ($("#Add_DIA").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar una Fecha',
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
            var ASISTENCIA_MATERIA2 = new Object();
            ASISTENCIA_MATERIA2.ID_SECCION = $("#Add_Seccion").val();
            ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA = $("#Add_DIA").val();


            var Enviar = JSON.stringify(ASISTENCIA_MATERIA2);

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../Profesor/CrearQrAsistencia',
                data: Enviar,
                success: function (d) {
                    if (d.RESPUESTA) {

                        InicioEstacionamiento();
                        let contador = 1;
                        var elem1 = document.getElementById("li");


                        while (elem1.firstChild) {
                            elem1.removeChild(elem1.firstChild);
                        }
                        var liPadre = document.getElementById("li");
                        var lihijo = document.createElement("li");
                        lihijo.setAttribute('data-target', '#carouselExampleIndicators');
                        lihijo.setAttribute('data-slide-to', 0);
                        lihijo.className = 'active ';
                        liPadre.appendChild(lihijo);

                        var elem2 = document.getElementById("badcarrusel");


                        while (elem2.firstChild) {
                            elem2.removeChild(elem2.firstChild);
                        }
                        var DivPadre = document.getElementById("badcarrusel");
                        var DivHijo = document.createElement("div");
                        DivHijo.className = 'carousel-item active';
                        var P = document.createElement("p");
                        P.innerHTML = "Tiene que presionar el boton Entrar para generar Qr"
                        DivHijo.appendChild(P);

                        DivPadre.appendChild(DivHijo);

                        var DivPadre1 = document.getElementById("badcarrusel");
                        var DivHijo1 = document.createElement("div");
                        DivHijo1.id = 'borrar';

                        DivPadre1.appendChild(DivHijo1);

                        var elem = document.getElementById("borrar");


                        while (elem.firstChild) {
                            elem.removeChild(elem.firstChild);
                        }


                        for (var i = 0; i < d.data.length; i++) {
                            var liPadre = document.getElementById("li");
                            var lihijo = document.createElement("li");
                            lihijo.setAttribute('data-target', '#carouselExampleIndicators');
                            lihijo.setAttribute('data-slide-to', contador++);
                            liPadre.appendChild(lihijo);

                            var DivPadre = document.getElementById("borrar");
                            var DivHijo = document.createElement("div");
                            DivHijo.className = 'carousel-item ';

                            var Imagen = document.createElement("img");
                            Imagen.setAttribute('src', d.data[i].imgCtrl);
                            //Imagen.className = 'd-block w-100';
                            Imagen.style.height = '158px';
                            Imagen.style.width = '219px';
                            DivHijo.append(Imagen);
                            DivPadre.appendChild(DivHijo);

                        }
                        //new Noty({
                        //    text: '<strong>Información</strong><br /> Guardado!.',
                        //    type: 'success',
                        //    theme: 'sunset',
                        //    layout: 'topRight',
                        //    timeout: 4000,
                        //    animation: {
                        //        open: bouncejsShow,
                        //        close: bouncejsClose
                        //    }
                        //}).show();


                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });



        }


    });
    $("#Add_Entrasda_Salidaexamen").click(function (e) {
        e.preventDefault();
        var Errores = 0;




        if ($("#Add_DIA").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar una Fecha',
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
            var ASISTENCIA_MATERIA2 = new Object();
            ASISTENCIA_MATERIA2.ID_SECCION = $("#Add_Seccion").val();
            ASISTENCIA_MATERIA2.ID_CALENDARIOMATERIA = $("#Add_DIA").val();


            var Enviar = JSON.stringify(ASISTENCIA_MATERIA2);

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../Profesor/CrearQrAsistenciaExamen',
                data: Enviar,
                success: function (d) {
                    if (d.RESPUESTA) {

                        InicioEstacionamiento();
                        let contador = 1;
                        var elem1 = document.getElementById("li");


                        while (elem1.firstChild) {
                            elem1.removeChild(elem1.firstChild);
                        }
                        var liPadre = document.getElementById("li");
                        var lihijo = document.createElement("li");
                        lihijo.setAttribute('data-target', '#carouselExampleIndicators');
                        lihijo.setAttribute('data-slide-to', 0);
                        lihijo.className = 'active ';
                        liPadre.appendChild(lihijo);

                        var elem2 = document.getElementById("badcarrusel");


                        while (elem2.firstChild) {
                            elem2.removeChild(elem2.firstChild);
                        }
                        var DivPadre = document.getElementById("badcarrusel");
                        var DivHijo = document.createElement("div");
                        DivHijo.className = 'carousel-item active';
                        var P = document.createElement("p");
                        P.innerHTML = "Tiene que presionar el boton Entrar para generar Qr"
                        DivHijo.appendChild(P);

                        DivPadre.appendChild(DivHijo);

                        var DivPadre1 = document.getElementById("badcarrusel");
                        var DivHijo1 = document.createElement("div");
                        DivHijo1.id = 'borrar';

                        DivPadre1.appendChild(DivHijo1);

                        var elem = document.getElementById("borrar");


                        while (elem.firstChild) {
                            elem.removeChild(elem.firstChild);
                        }


                        for (var i = 0; i < d.data.length; i++) {
                            var liPadre = document.getElementById("li");
                            var lihijo = document.createElement("li");
                            lihijo.setAttribute('data-target', '#carouselExampleIndicators');
                            lihijo.setAttribute('data-slide-to', contador++);
                            liPadre.appendChild(lihijo);

                            var DivPadre = document.getElementById("borrar");
                            var DivHijo = document.createElement("div");
                            DivHijo.className = 'carousel-item ';

                            var Imagen = document.createElement("img");
                            Imagen.setAttribute('src', d.data[i].imgCtrl);
                            //Imagen.className = 'd-block w-100';
                            Imagen.style.height = '158px';
                            Imagen.style.width = '219px';
                            DivHijo.append(Imagen);
                            DivPadre.appendChild(DivHijo);

                        }
                        //new Noty({
                        //    text: '<strong>Información</strong><br /> Guardado!.',
                        //    type: 'success',
                        //    theme: 'sunset',
                        //    layout: 'topRight',
                        //    timeout: 4000,
                        //    animation: {
                        //        open: bouncejsShow,
                        //        close: bouncejsClose
                        //    }
                        //}).show();


                    }
                },
                failure: function (response) {
                    alert("Fallo");
                }
            });



        }


    });

});