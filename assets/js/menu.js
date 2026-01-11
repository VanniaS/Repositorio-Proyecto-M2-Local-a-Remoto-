$(document).ready(function () {

// Usar decimales 
        function formatearMonto(valor) {
        return Number(valor).toLocaleString("es-CL");
        }
    // Saldo desde Local Storage
    let saldo = localStorage.getItem("saldo");


    //Inicializarlo 
    if(saldo===null){
        saldo=750000;//monto de partida
        localStorage.setItem("saldo",saldo);
    }
    // Mostrar Saldo en Menú
    $("#saldo").text(formatearMonto(saldo));
    
 //Boton Depositar 
    $("#depositBtn").click(function () {
        redirigir("Depósitar", "deposit.html");
    });
  // Boton enviar dinero
    $("#sendBtn").click(function () {
        redirigir("Enviar Dinero", "sendmoney.html");
    });
   //Boton últimos movimientos
    $("#transactionBtn").click(function () {
        redirigir("Últimos Movimientos", "transaction.html");
    });

    function redirigir(nombrePantalla, ruta) {

        $("#mensajeMenu").html(`
            <div class="alert alert-info">
                Redirigiendo a ${nombrePantalla}...
            </div>
        `);

        setTimeout(function () {
            window.location.href = ruta;
        }, 1500);
    }
});
