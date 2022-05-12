
function startTime() {
    var today = new Date();
    var hr = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    //Add a zero in front of numbers<10
    min = checkTime(min);
    sec = checkTime(sec);
    document.getElementById("clock1").innerHTML = '<i id="movimiento" class="fa  fa-spin"></i> ' + hr + ":" + min + ":" + sec;
    var time = setTimeout(function () { startTime(); }, 1000);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

window.addEventListener("load", function () {

    startTime();
});


$(document).on('click', '#Add_Entrasda_Salida', function (e) {
    e.preventDefault();
 

    $.ajax({
        type: 'POST',
        url: '../Mantenedor/CrearQrentradaSalida',
        success: function (d) {
            if (d.RESPUESTA) {

                var datos = d.data;
                console.log(datos);
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
                P.innerHTML ="Tiene que presionar el boton Entrar para generar Qr"
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
            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });



});