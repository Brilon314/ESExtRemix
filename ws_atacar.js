function atacar() {
    // var autoAtack = LOCAL.getautoA();
    if (LOCAL.getImperio() == null)
        return;

    var ataque = {
        "guid": LOCAL.getImperio().guidImperio,
        "partida": GLOBAL.getPartida(),
        "ronda": GLOBAL.getRonda(),
        "nombreCiudad": $("#ataque-def #nombreheroed").html().trim(),
        "perdidasAtaque": parseInt($("#ataque-ata #perdidasheroe").html().trim().replace(".", "").replace(",", "")),
        "perdidasDefensa": parseInt($("#ataque-def #perdidasheroed").html().trim().replace(".", "").replace(",", "")),
        "atacante": new Array(),
        "defensor": new Array(),
        "bonus": new Array(),
        "round1": [],
        "round2": [],
        "round3": [],
        "round4": [],
        "round5": [],
        "round6": [],
        "round7": [],
        "round8": [],
        "round9": [],
        "round10": []
    };

    var asedio = LOCAL.getAsedioByName(ataque.nombreCiudad);
    if (asedio != null && asedio.marcado) {
        asedio.marcado = false;
        LOCAL.setAsedio(asedio);
    }

    $(".lista1 tr:has(td.atacante)").each(function(index, obj) {
        var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N", ""));
        var nombre = $(obj.children[1]).find("span").text();
        var inicio = parseInt($(obj.children[2]).html().trim());
        var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%", ""));
        var fin = parseInt($(obj.children[4]).html().trim());

        ataque.atacante.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
    });

    $(".lista1 tr:has(td.defensor)").each(function(index, obj) {
        var nivel = parseInt($($(obj.children[1]).contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })[0]).text().trim().replace("N", ""));
        var nombre = $(obj.children[1]).find("span").text();
        var inicio = parseInt($(obj.children[2]).html().trim());
        var porcentaje = parseInt($(obj.children[3]).html().trim().replace("%", ""));
        var fin = parseInt($(obj.children[4]).html().trim());

        ataque.defensor.push(atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin));
    });

    $("#rra .bonus_ataque").each(function(index, obj) {
        var bonus = obj.className + $(obj).text();
        ataque.bonus.push(bonus);
    });

    $("#rra .round").each(function(index, obj) {
        var roundNumber = index + 1;
        ataque['round' + roundNumber].push($(obj).text());
    });

    var ataques = new Array();
    if (LOCAL.getAtaques() != null)
        ataques = LOCAL.getAtaques();
    ataques.push(ataque)
    LOCAL.setAtaque(ataques);
    //API.setAtaque(ataque);
    setTimeout(() => {
        document.getElementById("ataque-rounds").prepend(document.querySelectorAll("table")[2]);
    }, 200);

    // Auto ataque

    if (autoAtack) {
        location.replace("movertropas.php");
    }
}

function atacar_generateTropas(nombre, nivel, inicio, porcentaje, fin) {
    return {
        "nombre": nombre,
        "nivel": nivel,
        "inicio": inicio,
        "porcentaje": porcentaje,
        "fin": fin
    };
}
// Obtener el JSON almacenado en localStorage
const Atacar2 = localStorage.getItem('Atacar');

// Verificar si existe el JSON en localStorage
if (Atacar2) {
  // Parsear el JSON a un objeto JavaScript
  const objeto = JSON.parse(Atacar2);

  // Crear un objeto para almacenar los datos de cada round
  const rounds = {};
  var numround;
  // Iterar sobre los posibles rounds (round1 a round10)
  for (let i = 1; i <= 10; i++) {
    const roundKey = `round${i}`;
    numround= i;
    // Verificar si el objeto tiene la clave correspondiente (round1, round2, etc.)
    if (objeto[0][roundKey]) {
      // Almacenar los datos del round en el objeto rounds
      rounds[roundKey] = objeto[0][roundKey];
      processSingleRound(rounds[roundKey],numround);
      // Mostrar por consola los datos recopilados por cada round
      // console.log(processSingleRound(rounds[roundKey],numround));
    }
  }

} else {
  console.log('No se encontraron datos en localStorage bajo la clave "Atacar".');
}

function cleanString(input) {
  return input.replace(/\s{2,}/g, '\n').trim();
}
function processSingleRound(rawRound, roundNumber) {
  const cleanedRound = cleanString(rawRound.join(' '));
  const lines = cleanedRound.split('\n');
  const structuredRound = [];
  const troops = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const match = line.match(/elimina a (\d+) (.+?) N(\d+)/);
    if (match) {
      const [, count, type, level] = match;
      const troopKey = `${type} N${level}`;
      troops[troopKey] = troops[troopKey] || { start: 0, end: 0 };
      troops[troopKey].end -= parseInt(count, 10);
      structuredRound.push(`Se eliminan ${count} ${type} N${level}`);
    } else if (lines[i + 1] && !isNaN(lines[i + 1].trim())) {
      const troopName = line;
      const troopCount = parseInt(lines[i + 1].trim(), 10);
      troops[troopName] = troops[troopName] || { start: 0, end: 0 };
      troops[troopName].start += troopCount;
      troops[troopName].end += troopCount;
      structuredRound.push(`${line} ${lines[i + 1].trim()}`);
      i++;
    } else {
      structuredRound.push(line);
    }
  }
  return `Round ${roundNumber}:\n${structuredRound.join('\n')}`;
}

function cleanString(input) {
  return input.replace(/\s{2,}/g, '\n').trim();
}
