$(document).ready(function() {

  const listaTransacciones = [
    { tipo: "compra", descripcion: "lider.cl", monto: 50000 },
    { tipo: "deposito", descripcion: "Depósito a plazo", monto: 100000 },
    { tipo: "transferencia", descripcion: "Mami", monto: 75700 },
    { tipo: "compra", descripcion: " Felinus", monto: 55000 },
    { tipo: "deposito", descripcion: "Entre mis cuentas", monto: 105000 },
    { tipo: "transferencia", descripcion: "Kevin", monto: 75000 },
  ];

  function getTipoTransaccion(tipo) {
    switch(tipo) {
      case "compra": return "Compra";
      case "deposito": return "Depósito";
      case "transferencia": return "Transferencia recibida";
      default: return tipo;
    }
  }

  function mostrarUltimosMovimientos(filtro = "") {
    const $lista = $("#lista");
    $lista.empty();

    const filtrados = listaTransacciones.filter(t => filtro === "" || t.tipo === filtro);
    console.log("Movimientos filtrados:", filtrados); // <- VERIFICAR

    if(filtrados.length === 0) {
      $lista.append('<li class="list-group-item text-center">No hay movimientos</li>');
      return;
    }

    filtrados.forEach(t => {
      const li = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${t.descripcion} - ${getTipoTransaccion(t.tipo)}
                    <span>$${t.monto.toLocaleString()}</span>
                  </li>`;
      $lista.append(li);
    });
  }

  // Inicializa mostrando todos los movimientos
  mostrarUltimosMovimientos();

  // Filtrar movimientos al cambiar select
  $("#filtroTransaccion").on("change", function() {
    const filtro = $(this).val();
    console.log("Filtro seleccionado:", filtro);
    mostrarUltimosMovimientos(filtro);
  });

});


