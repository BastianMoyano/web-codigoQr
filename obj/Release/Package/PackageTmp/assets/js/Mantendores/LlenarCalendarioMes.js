$(document).ready(function () {
    var fecha = new Date();
    var ano = fecha.getFullYear();
    $("#ANO").text(ano);


});
$(document).ready(function () {
    $("#left-ano").click(function () {
        var Actual = parseInt($("#ANO").text());
        if (Actual !== 2018) {
            $("#ANO").text(Actual - 1);
        }
    });
    $("#right-ano").click(function () {
        var Actual2 = parseInt($("#ANO").text());
        $("#ANO").text(Actual2 + 1);

    });
    $("#MostrarCal").click(function () {
        $(this).parent().parent().parent().addClass("col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3").removeClass("col-xs-12 col-sm-12 col-md-1 col-lg-1 col-xl-1");
        $("#Calendario").show(500);
        $("#Detalles").addClass("col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9").removeClass("col-xs-12 col-sm-12 col-md-11 col-lg-11 col-xl-11");
    });
});
