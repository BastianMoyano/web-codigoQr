function LIBROS() {
    $.ajax({
        type: 'POST',
        url: '../Mantenedor/CargarBiblioteca',
        success: function (d) {
            if (d.RESPUESTA) {

                var datos = d.data;
                console.log(datos);

                

                for (var i = 0; i < d.data.length; i++) {

                    var DivPadre = document.getElementById("Bliblioteca");

                    //DIV 
                    var DivLibromovie_card = document.createElement("div");
                    DivLibromovie_card.classList.add('movie_card');
                    DivLibromovie_card.id = "bright";



                    var Divinfo_section = document.createElement("div");
                    Divinfo_section.classList.add('info_section');

                    var Divmovie_header = document.createElement("div");
                    Divmovie_header.classList.add('movie_header');

                    var Divmovie_desc = document.createElement("div");
                    Divmovie_desc.classList.add('movie_desc');

                    var pDescripcion = document.createElement("p");
                    pDescripcion.classList.add('text');
                    pDescripcion.innerText = d.data[i].DESCRIPCION;


                    var Imagen = document.createElement("img");
                    Imagen.classList.add('locandina');
                    Imagen.setAttribute('src', d.data[i].IMAGEN);

                    var h1 = document.createElement("h1");
                    h1.innerText = d.data[i].TITULO;

                    var h4 = document.createElement("h4");
                    h4.innerText = d.data[i].ANO +","+ d.data[i].AUTOR;

                    var spanPagina = document.createElement("span");
                    spanPagina.classList.add('minutes');
                    spanPagina.innerText = "Cantidad: " + d.data[i].numeroserie;


                    var pcategoria = document.createElement("p");
                    pcategoria.classList.add('type');
                    pcategoria.innerText = d.data[i].Categoria;

                    var Divmovie_social = document.createElement("div");
                    Divmovie_social.classList.add('movie_social');

                    var button = document.createElement("button");
                    button.classList.add('button1');
                    button.innerText = "Reserva";
                    button.id = "Reserva";
                    button.value = d.data[i].ID_LIBRO;

                    var blur_back  = document.createElement("div");
                    blur_back.classList.add('blur_back');
                    blur_back.id = d.data[i].ID_LIBRO;


                  
                    //blur_back.style.background = 'url(' + d.data[i].IMAGEN + ')';
                    //blur_back.style.position = 'absolute';
                    //blur_back.style.top = 0;
                    //blur_back.style.zIndex = 1;
                    //blur_back.style.height = '100%';
                    //blur_back.style.right = 0;
                    //blur_back.style.backgroundSize = 'cover';
                    //blur_back.style.borderRadius = '11px';
                   

                    DivPadre.appendChild(DivLibromovie_card);

                    DivLibromovie_card.appendChild(Divinfo_section);
                    Divinfo_section.appendChild(Divmovie_header);
                    Divinfo_section.appendChild(Divmovie_desc);
                    Divinfo_section.appendChild(Divmovie_social);
                    Divinfo_section.appendChild(blur_back);
           
              

                    Divmovie_header.appendChild(Imagen);
                    Divmovie_header.appendChild(h1);
                    Divmovie_header.appendChild(h4);
                    Divmovie_header.appendChild(spanPagina);
                    Divmovie_header.appendChild(pcategoria);



                    Divmovie_desc.appendChild(pDescripcion);

                    Divmovie_social.appendChild(button);



                    
                 



                }
            }
        },
        failure: function (response) {
            alert("Fallo");
        }
    });
}
window.addEventListener("load", function () {

    LIBROS();



});

$(document).on('click', '#Reserva', function (e) {
    e.preventDefault();

    var ID = $(this).val();
  
    $.ajax({
        type: 'POST',
        url: '../Mantenedor/CrearQrLibro',
        data: { 'id': parseInt(ID) },
        success: function (d) {
            if (d.RESPUESTA) {

                var datos = d.data;
                console.log(datos);
               
                

              

               
                //var elem2 = document.getElementById(d.data1);


                //while (elem2.firstChild) {
                //    elem2.removeChild(elem2.firstChild);
                //}

                   var DivPadre = document.getElementById(d.data1);
                var DivHijo = document.createElement("div");

               

                DivPadre.appendChild(DivHijo);

       
                for (var i = 0; i < d.data.length; i++) {
                
                   
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
    let identificadorTiempoDeEspera;

    function temporizadorDeRetraso() {
        alert("en 20 segundos desaparece el Qr.");
        identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 20000);
        
    }
    function funcionConRetraso() {
       
        document.getElementById('Bliblioteca').innerHTML = '';
        LIBROS();
    }
    temporizadorDeRetraso();
});