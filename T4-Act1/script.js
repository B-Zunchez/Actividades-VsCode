const contenedor = document.getElementById("contenedor");
const form = document.getElementById("form-receta");

// recetas base
const recetasBase = [
  {
    nombre: "Tacos de Pollo",
    imagen: "https://partaste.com/worldrecipes/wp-content/uploads/sites/2/2015/06/tacos_de_pollo.jpg",
    ingredientes: ["Tortillas", "Pollo", "Cilantro o tal vez es Perejil", "Cebolla"]
  },
  {
    nombre: "Pizza Casera",
    imagen: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/48a49653c8716457eb0b2f7eb3c7d74c/Derivates/8d83d9ed4567fa15456d8eec7557e60006a15576.jpg",
    ingredientes: ["Harina", "Queso", "Tomate", "Orégano"]
  }
];


// Recuperar recetas desde localStorage 
function obtenerRecetas() {
  const guardadas = localStorage.getItem("recetas");
  return guardadas ? JSON.parse(guardadas) : recetasBase;
}

// Guardar recetas en localStorage
function saveReceta(recetas) {
  localStorage.setItem("recetas", JSON.stringify(recetas));
}

function showRecetas() {
  const recetas = obtenerRecetas();
  contenedor.innerHTML = "";
  recetas.forEach(receta => {
    const div = document.createElement("div");
    div.className = "receta";
    div.innerHTML = `
      <img src="${receta.imagen}" alt="${receta.nombre}">
      <h2>${receta.nombre}</h2>
      <h3>Ingredientes:</h3>
      <ul>${receta.ingredientes.map(ing => `<li>${ing}</li>`).join("")}</ul>
    `;
    contenedor.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("imagen").value;
  const ingredientesTexto = document.getElementById("ingredientes").value;

  const nuevaReceta = {
    nombre,
    imagen,
    ingredientes: ingredientesTexto.split(",").map(i => i.trim())
  };

  const recetas = obtenerRecetas();
  recetas.push(nuevaReceta);
  saveReceta(recetas);
  showRecetas();
  form.reset();
});

// Mostrar al cargar
showRecetas();
