var _NONE = 0;
var _ASEDIO = 1;
var _REGIONES = 2;
var _RECONQUISTA = 3;
var _INFORME = 1;
var _INFORMECOMPARTIDO = 2;
var idClan = 0;
var clansResult = [];
var clans = [];
var listaClanesLinks = [];
var ccclans = [];
var ccclans2 = [];
var nomclan = "";
var enlace = "";
var datos;
var listaClanes = [];

function alwaysDo() {
  // ------------- Forzar fuente específica ------------- //
  // document.body.style.fontFamily = 'Times New Roman';
  var elements = document.querySelectorAll(".lista2 td");
  elements.forEach(function(element) {
    element.style.fontSize = "0.9em";
  });
  // ------------- EXPERIMENTAL ------------- //
  // Insertar estilos CSS adicionales
  // var css = `
  //       .error-container {
  //           display: flex;
  //           align-items: start; /* Alinea verticalmente al inicio */
  //           gap: 10px; /* Espacio entre la tabla y el mensaje */
  //       }
  //   `;
  // var styleSheet = document.createElement("style");
  // styleSheet.type = "text/css";
  // styleSheet.innerText = css;
  // document.head.appendChild(styleSheet);
  var iframe = document.createElement("iframe");
  var elementoLista = document.createElement("li");
  elementoLista.innerHTML = `<li><a href="ultimosataques.php">Ataques recibidos</a></li>`;
  document.querySelector("#sinfo  ul").children[2].innerHTML = `<a href="ultimosataquestuyos.php">Ataques realizados</a>`;
  document.querySelector("#sinfo  ul").children[2].before(elementoLista);
  ///   MENU COLAPSABLE
  // CSS para ocultar elementos
  const hideStyle = `
    .hidden-element {
        display: none !important;
    }
`;
  var position = $("#hora > span").offset();
  const btnExtras = $("<button>Extras</button>").appendTo("body");



// Estilos para el botón
$(btnExtras).css({
  position: "fixed",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  padding: "8px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  transition: "background-color 0.3s"
});

// Efecto hover para el botón
$(btnExtras).hover(
  function() { $(this).css("backgroundColor", "#45a049"); },
  function() { $(this).css("backgroundColor", "#4CAF50"); }
);

// Creación y estilos del menú desplegable
const menuDesplegable = $("<div></div>").attr("id", "menuDesplegable").appendTo("body").hide();
$(menuDesplegable).css({
  position: "fixed",
  top: "50px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1001,
  minWidth: "200px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
});

// Estilos para las opciones del menú
const opcionStyle = {
  padding: "10px 15px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  transition: "background-color 0.2s"
};

// Creación de la opción de exportar con estilos
const opcionExportar = $("<div>Exportar formaciones</div>").appendTo(menuDesplegable).css(opcionStyle);

// Efecto hover para las opciones
$(opcionExportar).hover(
  function() { $(this).css("backgroundColor", "#f0f0f0"); },
  function() { $(this).css("backgroundColor", ""); }
);

// Evento click para la opción
$(opcionExportar).on("click", exportData);

// Función para mostrar/ocultar el menú desplegable
$(btnExtras).on("click", function(event) {
  event.stopPropagation(); // Previene que el click se propague al documento
  $(menuDesplegable).toggle();
});

// Cerrar el menú al hacer clic fuera de él
$(document).on("click", function(event) {
  if (!$(event.target).closest(menuDesplegable).length) {
    $(menuDesplegable).hide();
  }
});


  // Función para exportar datos (la misma que tenías)
  function exportData() {
    const formaciones = localStorage.getItem('Formaciones');
    if (formaciones) {
      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1;
      var año = fechaActual.getFullYear();
      var fechaFormateada = dia + "-" + mes + "-" + año;
      const formaciones2 = localStorage.getItem('Imperio');
      var dataJSON = formaciones2;
      var objeto = JSON.parse(dataJSON);
      var nombre = objeto.nombre;
      var clan = objeto.clan;
      var nomArchivo = nombre + "_" + clan + "_" + fechaFormateada + ".json";
      descargarDatos(nomArchivo, formaciones);
    } else {
      alert('No hay formaciones guardadas para exportar.');
    }
  }
    // Función para exportar datos (la misma que tenías)
  function exportData2() {
    const Atacar = localStorage.getItem('Atacar');
    if (Atacar) {
      var fechaActual = new Date();
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1;
      var año = fechaActual.getFullYear();
      var fechaFormateada = dia + "-" + mes + "-" + año;
      const Atacar2 = localStorage.getItem('Atacar');
      var dataJSON = Atacar2;
      var objeto = JSON.parse(dataJSON);
      var nombre = objeto.nombre;
      var clan = objeto.clan;
      var nomArchivo = nombre + "_" + clan + "_" + fechaFormateada + ".json";
      descargarDatos(nomArchivo, Atacar);
    } else {
      alert('No hay Atacar guardadas para exportar.');
    }
  }


  // Función para descargar datos (la misma que tenías)
  function descargarDatos(nombreArchivo, contenido) {
    const blob = new Blob([contenido], {
      type: 'text/plain;charset=utf-8'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombreArchivo;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  cargaImperio2();
  // Agregar los estilos al documento
}
var GLOBAL = {
  showError: function(msg, container, time) {
    var mensajeError = document.createElement("div");
    mensajeError.className = "mensajeError";
    mensajeError.innerHTML = msg;
    container.appendChild(mensajeError);
    if (time != undefined) {
      setTimeout(function() {
        container.querySelector(".mensajeOk").forEach(function callback(obj, index) {
          if (obj.innerText == msg) obj.remove();
        });
      }, time * 1000);
    }
  },
  showMessage: function(msg, time) {
    var mensajeInfo = document.createElement("div");
    mensajeInfo.className = "mensajeInfo";
    mensajeInfo.innerHTML = msg;
    document.getElementById("contenido").prepend(mensajeInfo);
    if (time != undefined) {
      setTimeout(function() {
        document.getElementById("contenido").querySelector(".mensajeOk").forEach(function callback(obj, index) {
          if (obj.innerText == msg) obj.remove();
        });
      }, time * 1000);
    }
  },
  showConsole: function(data) {
    console.error("EXTENSION EXCEPTION\n" + data.responseText);
  },
  getPartida: function() {
    return $($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[1], ).text().trim().replace("(Ronda ", "").replace(")", "").split(" ")[0];
  },



  getClanCantidad: function() {
    switch (GLOBAL.getPartida()) {
      case "KENARON":
        return 20;
      case "GARDIS":
      case "ZULA":
        return 10;
      case "NUMIAN":
        return 5;
      case "FANTASY":
        return 3;
      default:
        return 0;
    }
  },
  gobiernoRegion: function(region) {
    return LOCAL.getGobernantes()[region] == LOCAL.getImperio().clan;
  },
  getRonda: function() {
    return parseInt($($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[1], ).text().trim().replace("(Ronda ", "").replace(")", "").split(" ")[1], );
  },
  getFechaFin: function() {
    return $("#_infopartida .fecha_local").text();
  },
  getHorasProteccion: function() {
    return parseInt($($("#_infopartida").contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE;
    })[4], ).text().trim().substring(0, 2), );
  },
  showOpcionesDisponibles: function() {
    $("<div style='position: absolute; border-radius: 5px; border: 2px solid #35771F; padding: 5px; margin: 10px'><b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b></div>").insertBefore("#subcabecera");
  },


getFechaFin: function() {
  var fechaLocal = document.querySelector("#_infopartida .fecha_local");
  return fechaLocal ? fechaLocal.textContent : null;
},
getHorasProteccion: function() {
  var infopartida = document.getElementById("_infopartida");
  var textNodes = Array.from(infopartida.childNodes).filter(function(node) {
    return node.nodeType === Node.TEXT_NODE;
  });

  if (textNodes.length > 4) {
    return parseInt(textNodes[4].textContent.trim().substring(0, 2));
  }
  return null; // o algún valor por defecto en caso de que no haya suficientes nodos de texto
},
showOpcionesDisponibles: function() {
  var div = document.createElement("div");
  div.style.position = "absolute";
  div.style.borderRadius = "5px";
  div.style.border = "2px solid #35771F";
  div.style.padding = "5px";
  div.style.margin = "10px";
  div.innerHTML = "<b>PRESIONA EL ICONO DE LA EXTENSIÓN PARA VER LAS OPCIONES DISPONIBLES</b>";

  var subcabecera = document.getElementById("subcabecera");
  if (subcabecera) {
    subcabecera.parentNode.insertBefore(div, subcabecera);
  }
},


  crearBoton: function(donde, nombre, accion) {
    //crear boton
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = nombre;
    button.onclick = accion;
    button.className = "boton-papiro";
    const parentElement = document.querySelector(donde);
    if (parentElement) {
      parentElement.appendChild(button);
      return button;
    } else {
      console.error("No se encontró el elemento con el selector:", donde);
      return null;
    }
  },
  crearBoton2: function(donde, nombre, accion) {
    //crear boton
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = nombre;
    button.onclick = accion;
    button.className = "boton_bloque";
    const parentElement = document.querySelector(donde);
    if (parentElement) {
      parentElement.appendChild(button);
      return button;
    } else {
      console.error("No se encontró el elemento con el selector:", donde);
      return null;
    }
  },
  cargaHeroe: function() {
    if (LOCAL.getHeroe() != null) {
      var heroes = LOCAL.getHeroe();
      var count = 0;
      for (var i = heroes.length - 1; i >= 0; i--) {
        if (!heroes[i].cargada) {
          location.replace(heroes[i].link);
          return;
        }
      }
    } else location.replace("tuimperio.php");
  },
  cargaCiudad: function() {
    if (LOCAL.getCiudad() != null) {
      var ciudades = LOCAL.getCiudad();
      var count = 0;
      for (var i = ciudades.length - 1; i >= 0; i--) {
        if (!ciudades[i].cargada) {
          location.replace("ciudad.php?id=" + ciudades[i].idCiudad);
          return;
        }
      }
    } else location.replace("tuimperio.php");
  },
};

function cargaImperio2() {
  // var listaClanes = [];
  if (LOCAL.getPoliticas() == null) {
    cargaFantasma(location.origin + "/politica.php", getPoliticas, LOCAL.setPoliticas);
  }
  if (LOCAL.getGobernantes() == null) {
    cargaFantasma(location.origin + "/gobierno.php", getGobernantes, LOCAL.setGobernantes);
  }
  if (LOCAL.getComercio() == null) {
    cargaFantasma(location.origin + "/comercio.php", obtenerPreciosVenta, LOCAL.setComercio);
  }
  if (LOCAL.getRecSMS() == null) {
    cargaFantasma(location.origin + "/mejoras.php", obtenerRecSMS, LOCAL.setRecSMS);
  }
  /*  if (LOCAL.getComercio == null) {
        var comercio = obtenerPreciosVenta();
        LOCAL.setComercio = comercio;
      }*/
  async function ejecutarFuncionesEnOrden() {
    try {
      siglaBuscada = await obtenerClanImperio();
      listaClanes = await getSiglaAndLink();
      enlace = await obtenerLinkPorSigla(siglaBuscada);
      datos = await obtenerMaras(enlace);
      /*comerce = await obtenerPreciosVenta();
      if (comerce != null) {
        LOCAL.setComercio = comerce;
      }*/
     /* recSMS = await obtenerRecSMS();
      if (recSMS != null || recSMS == "") {
        LOCAL.setRecSMS = recSMS;
      }*/
      await mostrarMensaje();

    } catch (error) {
      console.error("Ocurrió un error al ejecutar las funciones:", error);
    }
  }
  ejecutarFuncionesEnOrden();

  function cargaFantasma(url, funcionLectura, funcionCarga) {
    fetch(url).then((response) => {
      // Verifica si la solicitud fue exitosa (código de estado 200)
      if (response.status === 200) {
        return response.text(); // Obtiene el contenido HTML como texto
      } else {
        throw new Error("Error en la solicitud");
      }
    }).then((html) => {
      // Parsea el HTML y extrae información
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      // Utiliza métodos DOM para acceder y extraer datos
      funcionCarga(funcionLectura(doc));
      return funcionLectura(doc);
    }).catch((error) => {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
    });
  }

function obtenerPreciosVenta(doc) {
  // Función para obtener el precio de venta de un recurso
  function obtenerPrecioVenta(recurso) {
    const elemento = doc.querySelector(`tr.${recurso.toLowerCase()} td:nth-child(4) input[type="hidden"]`);
    return elemento ? parseInt(elemento.value, 10) : null;
  }

  // Lista de recursos
  const recursos = ["Alimentos", "Agua", "Hierro", "Herramientas", "Armas", "Piedra", "Bloques", "Madera", "Tablas", "Mithril", "Cristal", "Plata", "Reliquias", "Gemas", "Joyas"];
  const precios = {};

  recursos.forEach(recurso => {
    const precioVenta = obtenerPrecioVenta(recurso);
    if (precioVenta !== null) {
      precios[recurso] = precioVenta;
    }
  });

  return precios; // Devuelve un objeto con los precios de venta de los recursos
}

function obtenerRecSMS(doc) {
  // Selecciona el elemento <select> por su nombre
  const selectElement = doc.querySelector('select[name="recurso"]');
  const recursosLista = ["Alimentos", "Agua", "Hierro", "Herramientas", "Armas", "Piedra", "Bloques", "Madera", "Tablas", "Mithril", "Cristal", "Plata", "Reliquias", "Gemas", "Joyas"];
  const recursosObjeto = {};

  // Recorre cada opción del select
  selectElement.querySelectorAll('option').forEach(option => {
    // Extrae el texto de la opción (ej: "168.916 ALIMENTOS")
    const text = option.textContent;
    // Divide el texto en cantidad y nombre de recurso
    const [cantidad, ...nombreArray] = text.split(' ');
    const nombre = nombreArray.join(' ').toUpperCase();
    // Busca el nombre del recurso en la lista recursosLista
    const recursoOriginal = recursosLista.find(recurso => recurso.toUpperCase() === nombre);
    if (recursoOriginal) {
      // Almacena en el objeto, usando el nombre del recurso original como clave y la cantidad como valor
      recursosObjeto[recursoOriginal] = parseFloat(cantidad.replace('.', ''));
    }
  });

  return recursosObjeto; // Devuelve un objeto con los recursos
}

  async function obtenerClanImperio() {
    try {
      const response2 = await fetch("https://www.empire-strike.com/tuimperio.php");
      if (response2.status !== 200) {
        throw new Error("Error en la solicitud");
      }
      const html = await response2.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const element = doc.querySelector("#datos > tbody > tr:nth-child(2) > td:nth-child(3)");
      if (element) {
        const content = element.textContent;
        const match = content.match(/\((.*?)\)/);
        if (match && match[1]) {
          nomclan = match[1];
          return nomclan; // Esto devolverá el texto entre paréntesis
        }
      }
      return null;
    } catch (error) {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
      throw error; // Re-lanza el error para que pueda ser capturado más adelante
    }
  }
  async function getSiglaAndLink() {
    try {
      const response = await fetch("https://www.empire-strike.com/listado_clanes.php");
      if (response.status !== 200) {
        throw new Error("Error en la solicitud");
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const table = doc.querySelector(".lista2");
      // const clans = [];
      for (var row of table.rows) {
        const cell = row.cells[1];
        if (cell) {
          const linkElement = cell.querySelector("a");
          const siglasMatch = cell.textContent.match(/\((\w+)\)/);
          if (linkElement && siglasMatch) {
            clans.push({
              siglas: siglasMatch[1],
              link: linkElement.getAttribute("href"),
            });
          }
        }
      }
      return clans;
    } catch (error) {
      console.error("Ocurrió un error al hacer la solicitud HTTP:", error);
      throw error;
    }
  }
  async function obtenerLinkPorSigla(sigla) {
    try {
      for (var i = 0; i < listaClanes.length; i++) {
        if (listaClanes[i].siglas === sigla) {
          return listaClanes[i].link;
        }
      }
    } catch (error) {
      console.error("Error obteniendo los clanes:", error);
    }
  }
  async function obtenerMaras(link_clan) {
    try {
      if (LOCAL.getClan() == null && LOCAL.getImperio().clan != "") {
        var urlClan = location.origin + "/" + link_clan;
        cargaFantasma(urlClan, getMaravillas, LOCAL.setClan);
      }
    } catch (error) {
      console.error("Error obteniendo los clanes:", error);
    }
  }
  async function mostrarMensaje() {
    try {
      console.log("Se cargaron todos los datos necesarios");
    } catch (error) {
      console.error("No se cargaron todos los datos necesarios.", error);
    }
  }
  // Llamar a la función
  function getMaravillas(doc) {
    var miClan = {
      maravilla1: null,
      maravilla2: null,
    };
    if (doc.getElementById("_ayudam1") == null) return miClan;
    miClan.maravilla1 = doc.querySelector("#_ayudam1 h3").innerText;
    if (doc.getElementById("_ayudam2") == null) return miClan;
    miClan.maravilla2 = doc.querySelector("#_ayudam2 h3").innerText;
    return miClan;
  }

  function getGobernantes(doc) {
    var gobernantes = [];
    var n_regiones = 0;
    switch (GLOBAL.getPartida()) {
      case "KENARON":
      case "GARDIS":
        n_regiones = 30;
        break;
      case "ZULA":
      case "NUMIAN":
        n_regiones = 16;
        break;
      case "FANTASY":
        n_regiones = 15;
    }
    for (i = 1; i <= n_regiones; i++) {
      gobernantes[i] = doc.getElementById("region" + i).innerText.trim().substring(0, 3);
    }
    return gobernantes;
  }

  function getPoliticas(doc) {
    var politica = {};
    doc.querySelectorAll(".lista1 tr").forEach(function callback(obj, index) {
      if (index == 0 || obj.children.length < 3) return;
      var contador = 0;
      for (var i = 0; i < 10; i++) {
        if (obj.children[4].children[i].src == "https://images.empire-strike.com/v2/interfaz/estrella-roja.png") contador = contador + 1;
        else break;
      }
      var nombre = obj.children[1].innerText.trim().split("Coste: ");
      politica[normalizar(nombre[0])] = contador;
    });
    return politica;
  }
  //borra tildes, espacios, y transforma en minusculas.
  function normalizar(str) {
    return str.toLowerCase().replaceAll(" ", "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

function desmarcarAsedio(idCiudad) {
  var asedio = LOCAL.getAsedio(idCiudad);
  $(".marcarAsedio_" + idCiudad).each(function(index, obj) {
    $(obj).css("color", "#006400");
    $(obj).text("[Marcar]");
  });
  asedio.marcado = false;
  LOCAL.setAsedio(asedio);
}

function moveAsedios(e) {
  var div = document.getElementById("asedios");
  div.style.position = "absolute";
  div.style.top = parseInt(e.clientY) - 20 + "px";
  div.style.left = parseInt(e.clientX) - 20 + "px";
}
