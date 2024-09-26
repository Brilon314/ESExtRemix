// Función para obtener recursos ordenados por valor de oro
function recursosOrdenadosPorOro() {
    // Obtener datos de comercio
    const comercioData = JSON.parse(localStorage.getItem("Comercio"));
    // Obtener datos de RecSMS
    const recSMSData = JSON.parse(localStorage.getItem("RecSMS"));
    // Obtener valor del oro de la página de mejoras
    const valorOro = parseFloat(document.querySelector("#tabla_mejoras > tbody > tr:nth-child(1) > td > div > div:nth-child(7) > strong").innerText);
    // Encontrar recursos más valiosos que el oro
    const recursosValiosos = [];
    for (const recurso in comercioData) {
        if (recSMSData.hasOwnProperty(recurso)) {
            const precioVenta = comercioData[recurso];
            const cantidad = recSMSData[recurso];
            const valorCanje = precioVenta * cantidad;
            if (valorCanje > valorOro) {
                recursosValiosos.push({
                    recurso: recurso,
                    valorOro: valorCanje
                });
            }
        }
    }
    // Ordenar recursos por valor de oro en orden descendente
    recursosValiosos.sort((a, b) => b.valorOro - a.valorOro);
    return recursosValiosos;
}

function agregarTablaTopRecursos() {
    // Obtener los tres recursos que más oro proporcionan
    const topRecursos = recursosOrdenadosPorOro();
    // Tomar solo los tres primeros recursos
    const tresMejoresRecursos = topRecursos.slice(0, 3);
    // Función para agregar separadores de miles
    function agregarSeparadoresMiles(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    // Crear el contenido HTML para los tres mejores recursos
    const contenidoHTML = tresMejoresRecursos.map(recurso => {
        const nombreRecurso = recurso.recurso.toLowerCase();
        const iconoRecurso = `https://images.empire-strike.com/v2/iconos/icon_${nombreRecurso}.png`;
        const cantidad = recurso.cantidad ? agregarSeparadoresMiles(recurso.cantidad) : '';
        const valorOro = agregarSeparadoresMiles(recurso.valorOro);
        return `
      <div class="cont_mejora">
        Ganar <strong>${valorOro}</strong> <span class="sprite-recurso oro absmiddle" title="Oro"></span>
        canejeando y vendiendo <span style="font-weight:bold;">${cantidad} ${recurso.recurso}</span> <img src="${iconoRecurso}" alt="${nombreRecurso}" width="20" height="20">
      </div>
    `;
    }).join('');
    // Agregar el contenido HTML después del selector #tabla_mejoras
    // const tablaMejoras = document.querySelector("#tabla_mejoras");
    const tablaMejoras = document.querySelector("#tabla_mejoras > tbody > tr:nth-child(1) > td > div > div:nth-child(9)");
    tablaMejoras.insertAdjacentHTML("afterend", contenidoHTML);
}
agregarTablaTopRecursos();