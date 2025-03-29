
function enviarDatos() {
  const nombre = document.getElementById('nombre').value;
  const numeroControl = document.getElementById('numeroControl').value;

  
  if (nombre && numeroControl) {
    sessionStorage.setItem('nombre', nombre);
    sessionStorage.setItem('numeroControl', numeroControl);

    // Abre la segunda ventana después de almacenar los datos
    const ventanaConfirmacion = window.open('confirmacion.html', '_blank');
  } else {
    alert("Por favor, complete ambos campos.");
  }
}

window.onload = function() {
  const nombre = sessionStorage.getItem('nombre');
  const numeroControl = sessionStorage.getItem('numeroControl');

  if (window.location.href.includes("confirmacion.html")) {
    // Verifica si los datos están presentes
    if (nombre && numeroControl) {
      const mensaje = `Nombre: ${nombre} <br>
      Número de control: ${numeroControl}.`;
      
      document.getElementById('mensajeConfirmacion').innerHTML = mensaje;
    } else {
      // Si no hay datos, muestra un mensaje de error
      document.getElementById('mensajeConfirmacion').innerHTML = "No se recibieron datos. Intenta de nuevo.";
    }
  }
};
