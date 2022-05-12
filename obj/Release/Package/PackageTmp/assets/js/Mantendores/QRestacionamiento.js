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
        url: '../Mantenedor/ListaEstacionamiento',
        success: function (resultado) {
            if (resultado.RESPUESTA) {

                document.getElementById("Add_Estacionamiento").innerHTML.value = 0;
                document.getElementById("Add_Estacionamiento").innerHTML='';

                for (var i = 0; i < resultado.datos.length; i++) {
                    var aux = document.getElementById("Add_Estacionamiento");
                    var option = document.createElement("option");
                    option.value = resultado.datos[i].ID_ESTACIONAMIENTO;
                    option.text = "Estacionamiento n°" + resultado.datos[i].CUPO + " Disponible"
                        ;
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


    $("#Add_Entrasda_Salida").click(function (e) {
        e.preventDefault();
        var Errores = 0;




        if ($("#Add_Estacionamiento").val() === "0") {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe seleccionar un estacionamiento',
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
            var ESTACIONAMIENTO = new Object();
            ESTACIONAMIENTO.ID_ESTACIONAMIENTO = $("#Add_Estacionamiento").val();


            var Enviar = JSON.stringify(ESTACIONAMIENTO);

            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: '../Mantenedor/CrearQrentradaSalidaBici',
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


} );