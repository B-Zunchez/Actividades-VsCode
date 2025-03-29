let mapa;
let marcador;

function obtenerUbicacion() {
  const resultado = document.getElementById("ubicacion");

  if (!navigator.geolocation) {
    resultado.textContent = "La geolocalización no es soportada por este navegador.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (posicion) => {
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      resultado.innerHTML = `<p>Latitud: ${lat.toFixed(6)}</p><p>Longitud: ${lon.toFixed(6)}</p>`;
      mostrarEnMapa(lat, lon);
    },
    (error) => {
      resultado.textContent = "Error al obtener la ubicación: " + error.message;
    }
  );
}

function inicializarMapa() {
  // Ubicación por defecto (si no se ha obtenido aún)
  const ubicacionInicial = { lat: 0, lng: 0 };
  mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: ubicacionInicial,
    zoom: 2,
  });
}

function mostrarEnMapa(lat, lon) {
  const posicion = { lat, lng: lon };
  mapa.setCenter(posicion);
  mapa.setZoom(15);

  if (marcador) {
    marcador.setPosition(posicion);
  } else {
    marcador = new google.maps.Marker({
      position: posicion,
      map: mapa,
      title: "Tu ubicación",
    });
  }
}
