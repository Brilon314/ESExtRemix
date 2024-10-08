

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    chrome.scripting.insertCSS({
        target: { tabId: currentTab.id },
        files: ["tuimperio/estilosEspeciales.css"]
    }, function() {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError);
        } else {
            console.log("CSS inserted successfully");
        }
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.message == "addAsedio")
	  	addAsedio(request.asedio);
		if (request.message == "removeAsedio")
			removeAsedio(request.asedio);
});

var asedios = {};
var notificaciones = {};

setInterval(checkAsedio, 1000 * 60);

function checkAsedio()
{
	var now = new Date();
	for(var key in asedios) {
	  if(asedios[key] == null)
			continue;

		var asedio = asedios[key];
		var horaNotificacion = (new Date(asedio.fecha)).addMinutes(-5);
		var horaAsedio = new Date(asedio.fecha);
		if(horaNotificacion <= now)
		{
			if(notificaciones[key] == undefined || notificaciones[key] == null || now > notificaciones[key])
			{
				var minutos = parseInt((horaAsedio - now) / 60 / 1000);
				notificaciones[key] = horaAsedio;
				sendNotification("En menos " + minutos + " minutos estará disponible para atacar la ciudad: " + asedio.ciudad);
			}

			asedios[key] = null;
		}
	}
}

Date.prototype.addMinutes = function(h) {
   this.setTime(this.getTime() + (h * 60 * 1000));
   return this;
}

function addAsedio(asedio)
{
	asedios[asedio.idCiudad + "_" + asedio.partida] = asedio;
}

function removeAsedio(asedio)
{
	asedios[asedio.idCiudad + "_" + asedio.partida] = null;
}

function sendNotification(msg)
{
	var notificationOptions = {
		title: "Asedio",
		message: msg,
		type: "basic",
		iconUrl: "icon.png"
	};

	chrome.notifications.create("", notificationOptions, function(){ console.log("Done!")})
}
