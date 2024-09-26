// ===========================================================================
//  CÁLCULO DE QUESTS FÁCILES PARA SUBIR DE NIVEL
// ===========================================================================


// Calcular y mostrar quests fáciles para subir de nivel
const datosHeroeTable = document.getElementById("datosheroe");
const expActualElement = datosHeroeTable.querySelector("tbody td p");
const expNextLevelElement = datosHeroeTable.querySelector("div:nth-child(1) > table > tbody > tr > td:nth-child(3) > p:nth-child(1)");

// Obtener y parsear (convertir a números) la experiencia actual y necesaria para el siguiente nivel
const expActual = parseInt(expActualElement.innerHTML.trim(), 10); // Trim para eliminar espacios en blanco
const expNextLevel = parseInt(expNextLevelElement.innerHTML.trim(), 10);

// Calcular la diferencia de experiencia
const diferenciaExp = expNextLevel - expActual;

// Calcular la cantidad de quests fáciles necesarias (cada quest da 150 exp)
const questsFaciles = Math.ceil(diferenciaExp / 150); // Redondear hacia arriba

// Insertar la información de quests fáciles antes del selector especificado
const selectorReferenc = document.querySelector("#sidebar_heroes > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > table.inforecursos");
const questsInfoElement = document.createElement("div");
questsInfoElement.style.marginTop = "10px";
questsInfoElement.style.textAlign = "center";
questsInfoElement.innerHTML = `<strong>Quest para subir de nivel</br> Fáciles: </strong>${questsFaciles} `;
selectorReferenc.parentNode.insertBefore(questsInfoElement, selectorReferenc);

// Eliminar el texto no deseado
const textoEliminar = document.querySelector("#infoheroedes > strong:nth-child(3)");
if (textoEliminar) {
    textoEliminar.remove();
}

// Obtener el nivel del héroe
const nivelHeroeElement = document.querySelector("#nivelh > strong");
const nivelHeroe = parseInt(nivelHeroeElement.textContent, 10);

// Calcular la capacidad máxima de tropas
const capacidadMaxima = nivelHeroe * 4;

// Crear un elemento para mostrar la capacidad con espacio y centrado
const capacidadElement = document.createElement("div");
capacidadElement.style.marginTop = "10px"; // Espacio superior de 10px
capacidadElement.style.marginBottom = "10px"; // Espacio inferior de 10px
capacidadElement.style.textAlign = "center"; // Centrar el texto
capacidadElement.innerHTML = `Capacidad Máxima:<strong> ${capacidadMaxima}K</strong>`;

// Insertar el elemento después del selector indicado
const selectorReferencia = document.querySelector("#sidebar_heroes > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > table.inforecursos");
selectorReferencia.parentNode.insertBefore(capacidadElement, selectorReferencia.nextSibling);
