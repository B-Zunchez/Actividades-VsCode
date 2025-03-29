let lector;
let escaneando = false;

function generarQR() {
  const texto = document.getElementById("textoQR").value;
  const contenedorQR = document.getElementById("qrcode");
  contenedorQR.innerHTML = "";
  if (texto.trim() === "") return;

  new QRCode(contenedorQR, {
    text: texto,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

function iniciarEscaneo() {
  if (escaneando) return; // evitar múltiples arranques

  lector = new Html5Qrcode("reader");
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const camaraId = devices[0].id;
      lector.start(
        camaraId,
        {
          fps: 10,
          qrbox: 250,
        },
        (qrTexto) => {
          document.getElementById("resultadoScan").innerText = qrTexto;
          detenerEscaneo(); // detener tras primer lectura
        },
        (error) => {
          console.warn("QR no detectado: ", error);
        }
      );
      escaneando = true;
    }
  }).catch(err => {
    console.error("No se pudo acceder a la cámara: ", err);
  });
}

function detenerEscaneo() {
  if (lector && escaneando) {
    lector.stop().then(() => {
      escaneando = false;
      document.getElementById("reader").innerHTML = "";
    }).catch(err => {
      console.error("Error al detener escaneo: ", err);
    });
  }
}