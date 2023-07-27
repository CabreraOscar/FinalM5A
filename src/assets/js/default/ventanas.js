

function mostrarVentana() {
    var ventana = document.getElementById("ventana");
    ventana.style.display = "block";
     // Mostrar la ventana flotante
}


function cerrarVentana() {
    var ventana = document.getElementById("ventana");
      ventana.style.display = "none";
}

function cerrarVentanaP() {
  var ventana = document.getElementById("ventanap");
    ventana.style.display = "none";
}

function cerrarVentanaS() {
  var ventana = document.getElementById("ventanas");
    ventana.style.display = "none";
}

function cerrarVentanaM() {
  var ventana = document.getElementById("ventanam");
    ventana.style.display = "none";
}

function cerrarVentanaR() {
  var ventana = document.getElementById("ventanar");
    ventana.style.display = "none";
}

function cerrarVentanaEP() {
  var ventana = document.getElementById("ventanad");
    ventana.style.display = "none";
}

function cerrarVentanaDA() {
  var ventana = document.getElementById("ventanaDA");
    ventana.style.display = "none";
}


// Variable global para almacenar el elemento de la ventana abierta
var ventanaAbierta = null;

function cerrarVentanaActual() {
  // Cerrar la ventana actual si existe
  if (ventanaAbierta) {
    ventanaAbierta.style.display = "none";
  }
}

function mostrarVentana(elementoVentana) {
  cerrarVentanaActual();

  // Mostrar la nueva ventana seleccionada
  elementoVentana.style.display = "block";
  
  // Actualizar el valor de ventanaAbierta
  ventanaAbierta = elementoVentana;
}

function abrirventanita(){
  const myModal = new bootstrap.Modal(document.getElementById('miventanita'), options);
}
 