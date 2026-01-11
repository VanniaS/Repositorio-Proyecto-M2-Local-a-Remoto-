$(document).ready(function () {

  // Valor en Decimales
  function formatearMonto(valor) {
    return Number(valor).toLocaleString("es-CL");
  }


    // Obtener saldo desde localStorage
    let saldo = localStorage.getItem("saldo");

    if (saldo === null) {
        saldo = 750000;
        localStorage.setItem("saldo", saldo);
    }

    saldo = parseInt(saldo);

    // Mostrar saldo actual
    $("#saldoActual").text(formatearMonto(saldo));

    $("#depositForm").submit(function (e) {
        e.preventDefault();

        const monto = parseInt($("#monto").val());

        if (isNaN(monto) || monto <= 0) {
            mostrarAlerta("Ingrese un monto válido", "danger");
            return;
        }

        // Actualizar saldo
        saldo += monto;
        localStorage.setItem("saldo", saldo);

        // Actualizar vista
        $("#saldoActual").text(saldo);

        // Leyenda del depósito
        $("#leyendaDeposito").text(`Has depositado $${formatearMonto(monto)}`);

        // Mensaje de éxito
        mostrarAlerta("Depósito realizado con éxito", "success");

        // Redirección al menú
        setTimeout(function () {
            window.location.href = "menu.html";
        }, 3000);
    });

    // BOTÓN VOLVER
    $("#volverMenuBtn").click(function () {
        window.location.href = "menu.html";
    });


    function mostrarAlerta(mensaje, tipo) {
        $("#alert-container").html(`
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${mensaje}
                <button type="button" class="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        `);
    }

});
