$(document).ready(function () {

    $("#loginForm").on ("submit",function (e) {
        e.preventDefault();

        // Uso de selectores jQuery 
        const user = $("#user").val().trim();
        const pass = $("#pass").val().trim();

    // Limpia Alerta
        $("#alerta").html("");

        //  validación básica
        if (user === "" || pass === "") {
            mostrarAlerta("Debe completar todos los campos", "danger");
            return;
        }

        // Lógica de login
        if (user === "Murci" && pass === "M1234") {
            mostrarAlerta("Inicio de sesión exitoso. Redirigiendo...","success");
        
        // Redirección usando JQuery y window.location
      setTimeout(function(){
        window.location.href ="menu.html";
      },1500);

        
    } else {
            mostrarAlerta("Usuario o contraseña incorrectos","danger");
        }
    });
  function mostrarAlerta (mensaje,tipo){
    $("#alerta").html(`
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
        <button type="button" class="close" data-dismiss="alert">
        <span>&times;</span>
        </button>
        </div>
        `);
    }
});


