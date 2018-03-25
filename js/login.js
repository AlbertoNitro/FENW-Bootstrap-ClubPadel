$(document).ready(function() {
    ocultarErrorFormulario();
    detenerSubmitFormulario();
    $("#btnEntrar").click(function() {
        if (esFormularioValido()) {
            mostrarError("Debes indicar que no eres un robot.");
        }
    });
});

function recaptchaValidoCallback(){
    ocultarErrorFormulario();
    $("#btnEntrar").click(function() {
        if (esFormularioValido()) {
            realizarLlamadaAjax();
        }
    });
}

function detenerSubmitFormulario() {
    $("#credenciales").submit(function (){
        return false;
    });
}

function esFormularioValido() {
    return $('#userid').val() && $('#password').val();
}

function realizarLlamadaAjax() {
    $.ajax({
        url : 'http://salonso.etsisi.upm.es/fenw/padel/login.php', //
        data : { userid : $('#userid').val(), password : $('#password').val() },
        type : 'GET',
        success : function(data, textStatus, xhr) {
            switch(xhr.status) {
                case 200:
                    var headerAuth = xhr.getResponseHeader('Authorization');
                    if (headerAuth) {
                        sessionStorage.setItem("tokenPadelClub", headerAuth.split(' ')[1]);
                        window.location.replace("index.html");
                    } else {
                        mostrarError("El usuario o la contraseña indicada no coinciden con un usuario existente.");
                    }
                    break;
                case 400:
                    mostrarError("No ha indicado el usuario o la contraseña.");
                    break;
                case 401:
                    mostrarError("El usuario o la contraseña indicada no existen.");
                    break;
                default:
                    mostrarError("No es posible autenticarse en el sistema en esteos momentos.");
            }
            limpiarCampoPassword();
        },
        error : function() {
            mostrarError('Disculpe, existió un problema al intentar establecer conexion con el servidor. Intentelo de nuevo mas tarde');
        }
    });
}

function limpiarCampoPassword() {
    $('#password').val("");
}

function mostrarError(textoError) {
    $('#mensajeErrorFormulario').text(textoError);
    $('#errorFormulario').fadeIn("slow");
}

function ocultarErrorFormulario() {
    $('#errorFormulario').hide();
}