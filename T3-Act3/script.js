const carrusel = document.getElementById("carrusel");
const totalImagenes = 8;
let indiceActual = 0;
let intervalo = 330; // tiempo en ms
let intervaloID = null;

function mostrarImagen(index) {
  carrusel.style.transform = `translateX(-${index * 100}%)`;
}

function siguiente() {
  indiceActual = (indiceActual + 1) % totalImagenes;
  mostrarImagen(indiceActual);
}

function anterior() {
  detenerCarrusel();
  indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
  mostrarImagen(indiceActual);
}

function iniciarCarrusel() {
  intervaloID = setInterval(siguiente, intervalo);
}

function detenerCarrusel() {
  clearInterval(intervaloID);
}

function aumentarVelocidad() {
  if (intervalo > 30) {
    intervalo -= 50;
    reiniciarCarrusel();
  }
}

function reducirVelocidad() {
  intervalo += 50;
  reiniciarCarrusel();
}

function reiniciarCarrusel() {
  detenerCarrusel();
  iniciarCarrusel();
}

// Iniciar automáticamente al cargar
iniciarCarrusel();