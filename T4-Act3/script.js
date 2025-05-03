import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


const form = document.getElementById("form-tarea");
const lista = document.getElementById("lista-tareas");
const tareasRef = collection(db, "tareas");
const filtroSelect = document.getElementById("filtro-status");
const btnNuevaTarea = document.getElementById("btn-nueva-tarea");
const campoCalificacion = document.getElementById("calificacion");

btnNuevaTarea.addEventListener("click", () => {
  form.classList.toggle("oculto");
  form.reset();
  form["id-edicion"].value = "";
});

form.status.addEventListener("change", () => {
  campoCalificacion.classList.toggle("oculto", !["calificada", "archivada"].includes(form.status.value));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tarea = {
    descripcion: form.descripcion.value,
    materia: form.materia.value,
    tema: form.tema.value,
    valor: Number(form.valor.value),
    fecha_entrega: form.fecha.value,
    status: form.status.value,
    calificacion: campoCalificacion.classList.contains("oculto") ? null : Number(form.calificacion.value)
  };

  const idEdicion = form["id-edicion"].value;
  try {
    if (idEdicion) {
      await updateDoc(doc(db, "tareas", idEdicion), tarea);
    } else {
      await addDoc(tareasRef, tarea);
    }
    form.reset();
    form.classList.add("oculto");
  } catch (error) {
    alert("Error al guardar: " + error);
  }
});

function mostrarTareas(snapshot) {
  lista.innerHTML = "";
  const filtro = filtroSelect.value;

  const tareas = snapshot.docs
    .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    .filter(t => {
      if (filtro === "todos") return t.status !== "archivada";
      return t.status === filtro;
    })
    .sort((a, b) => new Date(a.fecha_entrega) - new Date(b.fecha_entrega));

  tareas.forEach((tarea) => {
    const div = document.createElement("div");
    div.className = "tarea";
    div.dataset.id = tarea.id;

    div.innerHTML = `
      <input type="text" value="${tarea.descripcion}" class="edit-descripcion" disabled />
      <input type="text" value="${tarea.materia}" class="edit-materia" disabled />
      <input type="text" value="${tarea.tema}" class="edit-tema" disabled />
      <input type="date" value="${tarea.fecha_entrega}" class="edit-fecha" disabled />
      <input type="number" value="${tarea.valor}" class="edit-valor" disabled />
      <select class="edit-status" disabled>
        <option value="pendiente"${tarea.status === "pendiente" ? " selected" : ""}>Pendiente</option>
        <option value="entregada"${tarea.status === "entregada" ? " selected" : ""}>Entregada</option>
        <option value="calificada"${tarea.status === "calificada" ? " selected" : ""}>Calificada</option>
      </select>
      ${["calificada", "archivada"].includes(tarea.status) ? `<input type="number" class="edit-calificacion" placeholder="Calificación /100" value="${tarea.calificacion ?? ''}" disabled />` : ""}
      <div class="botones">
        <button class="editar boton-editar">Editar</button>
        <button class="guardar boton-guardar oculto">Guardar</button>
        <button class="cancelar boton-cancelar oculto">Cancelar</button>
        <button class="eliminar">Eliminar</button>
        ${tarea.status !== "archivada" ? `<button class="archivar">Archivar</button>` : ""}
      </div>
    `;

    lista.appendChild(div);
  });

  // Activar edición
  document.querySelectorAll(".editar").forEach(btn => {
    btn.addEventListener("click", () => {
      const div = btn.closest(".tarea");
      div.querySelectorAll("input, select").forEach(el => el.disabled = false);
      div.querySelector(".guardar").classList.remove("oculto");
      div.querySelector(".cancelar").classList.remove("oculto");
      btn.classList.add("oculto");
    });
  });

  // Guardar cambios
  document.querySelectorAll(".guardar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const div = btn.closest(".tarea");
      const id = div.dataset.id;

      const tareaActualizada = {
        descripcion: div.querySelector(".edit-descripcion").value,
        materia: div.querySelector(".edit-materia").value,
        tema: div.querySelector(".edit-tema").value,
        fecha_entrega: div.querySelector(".edit-fecha").value,
        valor: Number(div.querySelector(".edit-valor").value),
        status: div.querySelector(".edit-status").value,
        calificacion: div.querySelector(".edit-calificacion")?.value
          ? Number(div.querySelector(".edit-calificacion").value)
          : null
      };

      await updateDoc(doc(db, "tareas", id), tareaActualizada);
    });
  });

  // Cancelar edición
  document.querySelectorAll(".cancelar").forEach(btn => {
    btn.addEventListener("click", () => {
      onSnapshot(tareasRef, mostrarTareas);
    });
  });

  // Eliminar tarea
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const div = btn.closest(".tarea");
      await deleteDoc(doc(db, "tareas", div.dataset.id));
    });
  });

  // Archivar tarea
  document.querySelectorAll(".archivar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const div = btn.closest(".tarea");
      await updateDoc(doc(db, "tareas", div.dataset.id), { status: "archivada" });
    });
  });
}

// Escuchar los cambios en tiempo real
onSnapshot(tareasRef, mostrarTareas);
filtroSelect.addEventListener("change", () => onSnapshot(tareasRef, mostrarTareas));

// async function agregarTareasDeEjemplo() {
//   const ejemplos = [
//     { descripcion: "Investigar tema 1", materia: "Historia", tema: "U2: Edad Media", valor: 10, fecha_entrega: "2025-05-10", status: "pendiente", calificacion: null },
//     { descripcion: "Resumen capítulo 3", materia: "Español", tema: "U1: Literatura", valor: 15, fecha_entrega: "2025-05-11", status: "pendiente", calificacion: null },

//     { descripcion: "Mapa mental", materia: "Geografía", tema: "U2: Continentes", valor: 20, fecha_entrega: "2025-05-12", status: "entregada", calificacion: null },
//     { descripcion: "Ejercicios de repaso", materia: "Matemáticas", tema: "U2: Fracciones", valor: 25, fecha_entrega: "2025-05-13", status: "entregada", calificacion: null },

//     { descripcion: "Examen unidad 2", materia: "Ciencias", tema: "U1: Energía", valor: 30, fecha_entrega: "2025-05-14", status: "calificada", calificacion: 90 },
//     { descripcion: "Infografía de células", materia: "Biología", tema: "U1: Célula animal", valor: 15, fecha_entrega: "2025-05-15", status: "calificada", calificacion: 85 },

//     { descripcion: "Esquema de electricidad", materia: "Física", tema: "U1: Circuitos", valor: 20, fecha_entrega: "2025-05-16", status: "archivada", calificacion: 95 },
//     { descripcion: "Video presentación", materia: "Inglés", tema: "U1: Present perfect", valor: 10, fecha_entrega: "2025-05-17", status: "archivada", calificacion: 88 }
//   ];

//   for (const tarea of ejemplos) {
//     await addDoc(collection(db, "tareas"), tarea);
//   }
// }
// agregarTareasDeEjemplo();
