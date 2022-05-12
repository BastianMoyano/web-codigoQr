
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

function GetvalueRadio(crt) {
    for (let i = 0; i < crt.length; i++) {
        if (crt[i].checked) {
            return crt[i].value;
        }
    }
}
window.addEventListener('load', function () {

    //nativo javascript.
    document.getElementById('Ingresar').addEventListener('click', function (e) {
        e.preventDefault();
        const Usuario= document.getElementById('rut');
        const Password = document.getElementById('password');
        if (Usuario.value === "" || Password.value === "") {
            new Noty({
                text: '<strong>Inicio de Sesión</strong><br /> llenar los campos vacios <br /> ',
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

            $.ajax({
                type: 'POST',
                url: '../Login/Ingreso',
                content: 'application/json; charset_utf-8',
                dataType: 'json',
                data: { Rut: Usuario.value, Contrasena: Password.value },
                success: function (Dato) {
                    if (Dato.Respuesta) {

                        new Noty({
                            text: '<strong>Inicio de Sesión</strong> Redireccionado, espere por favor. ',
                            type: 'success',
                            theme: 'sunset',
                            layout: 'topRight',
                            timeout: 4000,
                            animation: {
                                open: bouncejsShow,
                                close: bouncejsClose
                            }
                        }).show();

                        window.location.href = "../Home/Index";
                    } else {
                        switch (Dato.Tipo) {
                            case 2:
                                new Noty({
                                    text: '<strong>Inicio de Sesión</strong><br /> Contraseña ingresada es incorrecta.<br />',
                                    type: 'error',
                                    theme: 'sunset',
                                    layout: 'topRight',
                                    timeout: 4000,
                                    animation: {
                                        open: bouncejsShow,
                                        close: bouncejsClose
                                    }
                                }).show();
                                break;

                            case 3:
                                new Noty({
                                    text: '<strong>Inicio de Sesión</strong><br /> Usuario no habilitado para ingresar <br /> ',
                                    type: 'error',
                                    theme: 'sunset',
                                    layout: 'topRight',
                                    timeout: 4000,
                                    animation: {
                                        open: bouncejsShow,
                                        close: bouncejsClose
                                    }
                                }).show();
                                break;
                            case 4:
                                new Noty({
                                    text: '<strong>Inicio de Sesión</strong><br /> Usuario no se encuentra registrado <br /> ',
                                    type: 'error',
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
                    }
                }
            });
        }

        //debugger; sirve para debuggear o depurar codigo javascript


    });

    ////Jquery
    //$('#Ingresar').click(function () {

    //});

});