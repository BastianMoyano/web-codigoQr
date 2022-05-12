window.addEventListener('load', function () {

    fetch('../Home/PermisosUsuarios', {
        method: 'POST'
    }).then(res => res.json())
        .then(response => {
            const sidebarUL = document.getElementById('MenuDinamico');
            response.Menu.forEach(item => {
                const Tipo = item.TIPO;

                switch (Tipo) {
                    case false:
                        let li = document.createElement('li');
                        li.classList.add('kt-menu__item');
                        li.setAttribute('aria-haspopup', 'true');
                        let anchor = document.createElement('a');
                        anchor.classList.add('kt-menu__link');
                        anchor.href = "../" + item.CONTROLADOR + "/" + item.VISTA;
                        let spann = this.document.createElement('span');
                        spann.classList.add('kt-menu__link-text');
                        spann.appendChild(this.document.createTextNode(item.NOMBRE_MENU));
                        //spann.style.color = "rgb(1, 74, 135)";
                        let iconn = this.document.createElement('i');
                        iconn.classList.add('kt-menu__link-icon', 'fas', item.ICONO);
                        anchor.appendChild(iconn);
                        anchor.appendChild(spann);
                        li.appendChild(anchor);
                        sidebarUL.appendChild(li);
                        break;

                    case true:

                        const SubMenus = response.Sub_menu.filter(SUBMENU => SUBMENU.COD_MODULO === item.ID_MENU);

                        let Li_origin = this.document.createElement('li');
                        Li_origin.classList.add('kt-menu__item', 'kt-menu__item--submenu', 'kt-menu__item--rel');
                        Li_origin.setAttribute('data-ktmenu-submenu-toggle', 'click');
                        Li_origin.setAttribute('aria-haspopup', 'true');

                        let a = this.document.createElement('a');
                        a.href = "javascript:;";
                        a.classList.add('kt-menu__link', 'kt-menu__toggle');
                        let span = this.document.createElement('span');
                        span.classList.add('kt-menu__link-text');
                        span.appendChild(this.document.createTextNode(item.NOMBRE_MENU));

                        let icon = this.document.createElement('i');
                        icon.classList.add('kt-menu__link-icon', 'fas', item.ICONO);
                        a.appendChild(icon);
                        a.appendChild(span);
                        Li_origin.appendChild(a);
                        let div = this.document.createElement('div');
                        div.classList.add('kt-menu__submenu', 'kt-menu__submenu--classic', 'kt-menu__submenu--left');

                        let ul = this.document.createElement('ul');
                        ul.classList.add('kt-menu__subnav');


                        SubMenus.forEach(Sub => {
                            let li = this.document.createElement('li');
                            li.classList = "kt-menu__item";
                            li.setAttribute('aria-haspopup', 'true');
                            let a = this.document.createElement('a');
                            a.href = "../" + Sub.CONTROLADOR + "/" + Sub.VISTA;
                            a.classList.add('kt-menu__link');
                            icon = this.document.createElement('i');
                            icon.classList.add('kt-menu__link-icon', 'fas', 'fa-arrow-circle-right');
                            //icon.style.color = "blue";
                            span = this.document.createElement('span');
                            span.classList.add('kt-menu__link-text');
                            span.appendChild(this.document.createTextNode(Sub.NOMBRE));
                            //span.style.color = "rgb(1, 74, 135)";
                            //span.style.color = "blue";
                            a.appendChild(span);
                            a.appendChild(icon);
                            li.appendChild(a);
                            ul.appendChild(li);

                        });

                        div.appendChild(ul);
                        Li_origin.appendChild(div);
                        sidebarUL.appendChild(Li_origin);

                        break;
                }


            });
        });
    $("#kt_aside_toggler").click(function (e) {
        e.preventDefault();
        $("#kt_aside_menu_wrapper").toggleClass("toggled");
    });

});