$(document).ready(function() {
    comprobarUsuarioLogueado();
});

function cerrarSesion() {
    sessionStorage.removeItem("tokenPadelClub");
    var elementLogin = $('#elementLogin');
    elementLogin.find('#myProfile').remove();
    elementLogin.append('<a id="btnLoguearse" href="login.html" class="colorMarroncito bordearColorMarroncito text-center"><span class="glyphicon glyphicon-log-in"></span> Login</a>');
    var btnLoguearse = $('#btnLoguearse');
    btnLoguearse.hide();
    btnLoguearse.fadeIn("slow");
    $('#btnRegistrarse').fadeIn("slow");
}

function comprobarUsuarioLogueado() {
    if (sessionStorage.getItem("tokenPadelClub")) {
        var elementLogin = $('#elementLogin');
        elementLogin.find('#btnLoguearse').remove();
        elementLogin.append(
        "<div id=\"myProfile\" class=\"btn-group\">" +
            "<button type=\"button\" class=\"dropdown-toggle tamanioBoton2x fondoMarroncito bordearColorMarroncito colorVerde4 negrita\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
            "<img src=\"images/iconUser.png\"/>" +
            " &nbsp;Mi perfil <span class=\"caret\"></span>" +
            "</button>" +
            "<ul class=\"dropdown-menu fondoMarroncito\">" +
                "<li><a href=\"#\" class=\"colorVerde4\"><i class=\"glyphicon glyphicon-education\"></i> &nbsp;Mis clases</a></li>" +
                "<li><a href=\"#\" class=\"colorVerde4\"><i class=\"glyphicon glyphicon-list-alt\"></i> &nbsp;Mis reservas</a></li>" +
                "<li><a href=\"#\" class=\"colorVerde4\"><i class=\"glyphicon glyphicon-user\"></i> &nbsp;Mis datos</a></li>" +
                "<li role=\"separator\" class=\"divider fondoVerde4\"></li>" +
                "<li><a href=\"#\" class=\"colorVerde4\" onclick=\"cerrarSesion()\"><i class=\"glyphicon glyphicon-log-out\"></i> &nbsp;Cerrar sesión</a></li>" +
            "</ul>" +
        "</div>"
        );
        $('#btnRegistrarse').hide();
    }
}