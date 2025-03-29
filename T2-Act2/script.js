
const modal = document.getElementById("confirmationModal");

document.getElementById("salir-btn").addEventListener("click", function() {
  modal.style.display = "block";  
});

function closeModal() {
  modal.style.display = "none";  
}

document.getElementById("confirmExit").addEventListener("click", function() {
  window.close();  
});

// Función para mostrar alerta con la opción seleccionada
function mostrarOpcion(opcion) {
  alert("Se seleccionó la " + opcion);
}
