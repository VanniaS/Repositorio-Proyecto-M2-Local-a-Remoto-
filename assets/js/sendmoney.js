$(document).ready(function() {
  
    let contactos = [];
   
   // Función para actualizar la lista de contactos 
    function actualizarLista(filtro = "") {
    const $select = $("#contactos");
    $select.empty();
    $select.append('<option value="" disabled selected>Seleccione un contacto</option>');

    contactos
      .filter(c =>
        c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        c.alias.toLowerCase().includes(filtro.toLowerCase())
      )
      .forEach((c, index) => {
        $select.append(`<option value="${index}">${c.nombre} (${c.alias})</option>`);
      });
  // Ocultar botón
    $("#enviarBtn").addClass("d-none");
  }

  // Evento de búsqueda en tiempo real
$("#buscarContacto").on("input", function() {
  const texto = $(this).val().trim();
  actualizarLista(texto);
});
  // Mostrar botón "Enviar dinero"
  $("#contactos").on("change", function() {
    if($(this).val() !== null) {
      $("#enviarBtn").removeClass("d-none");
    } else {
      $("#enviarBtn").addClass("d-none");
    }
  });
  
  // Función para mostrar alertas dentro del modal
  function mostrarAlerta(mensaje, tipo) {
    $("#alertaContacto").html(`<div class="alert alert-${tipo} mt-2">${mensaje}</div>`);
  }
   
  
  // Guardar contacto
  $("#guardarContacto").on("click", function() {
    const nombre = $("#nombreContacto").val().trim();
    const rut = $("#cbuContacto").val().trim();
    const alias = $("#aliasContacto").val().trim();
    const banco = $("#bancoContacto").val().trim();
 
 
    // Validar campos vacíos
    if(!nombre || !rut || !alias || !banco) {
      mostrarAlerta("Todos los campos son obligatorios", "danger");
      return;
    }
    
    // Validar formato de RUT
    const rutRegex = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
    if(!rutRegex.test(rut)) {
      mostrarAlerta("RUT inválido. Formato: 12345678-9", "danger");
      return;
    }
   
   
    // Guardar contacto
    contactos.push({nombre, rut, alias, banco});
    actualizarLista();
     
    
    // Limpiar inputs y alertas
    $("#nombreContacto, #cbuContacto, #aliasContacto, #bancoContacto").val("");
    $("#alertaContacto").html("");
  
  
    // Cerrar modal
    const contactoModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('contactoModal'));
    contactoModal.hide();
  });
 // Enviar dinero 
  $("#enviarBtn").on("click", function() {
    const index = $("#contactos").val();
    const monto = $("#montoEnvio").val().trim();

    if(!monto || isNaN(monto) || monto <= 0) {
      $("#mensaje").html('<div class="text-danger">Ingrese un monto válido</div>');
      return;
    }

    const contacto = contactos[index];
    $("#mensaje").html(`<div class="text-success">Se enviaron $${monto} a ${contacto.nombre} (${contacto.alias})</div>`);
      
    // Limpiar inputs y selección
    $("#montoEnvio").val("");
    $("#contactos").val("");
    $(this).addClass("d-none");
   
    // Ocultar mensaje 
    setTimeout(() => $("#mensaje").fadeOut(500, function() { $(this).html("").show(); }), 3000);
  });

  // Botón para regresar al menú principal
  $("#volverMenuBtn").on("click", function() {
    window.location.href = "menu.html";
  });
});
