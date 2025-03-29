function handleFocus(event) {
  event.target.style.borderColor = "#2980b9";  // Cambia el color del borde 

function handleBlur(event) {
  event.target.style.borderColor = "#ccc";  // Vuelve al color de borde 
}

function handleSubmit(event) {
  event.preventDefault();  

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const isCorreoValido = correoRegex.test(correo);
  
  // Validación de contraseña (mínimo 8 caracteres)
  const isPasswordValida = password.length > 7;

  let mensaje = "";  

  if (!isCorreoValido) {
      mensaje += "El correo electrónico no es válido.\n";
  }

  if (!isPasswordValida) {
      mensaje += "La contraseña debe tener al menos 8 caracteres.\n";
  }

  if (isCorreoValido && isPasswordValida) {
      window.location.href = "registro-exitoso.html";  
  } else {
      alert(mensaje);
  }
}

// eventos a los campos de entrada
document.getElementById('nombre').addEventListener('focus', handleFocus);
document.getElementById('nombre').addEventListener('blur', handleBlur);

document.getElementById('correo').addEventListener('focus', handleFocus);
document.getElementById('correo').addEventListener('blur', handleBlur);

document.getElementById('password').addEventListener('focus', handleFocus);
document.getElementById('password').addEventListener('blur', handleBlur);

document.getElementById('registroForm').addEventListener('submit', handleSubmit);

document.getElementById('submitBtn').addEventListener('click', function() {
  console.log("Botón clickeado");
});

document.getElementById('submitBtn').addEventListener('touchstart', function() {
  console.log("Botón tocado");
});
