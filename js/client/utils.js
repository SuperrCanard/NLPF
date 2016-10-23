if (socket == undefined)
    var socket = null;

$(document).ready(function () {

    if (socket == undefined || !socket) {
        socket = io.connect('http://localhost:8080');

        var session_open = localStorage.getItem("session_open");
        if (session_open == "true") {
            var session_id = parseInt(localStorage.getItem("session_id"));
            sendMessage("newConnection", session_id);

            socket.on("badConnection", function(id) {
                localStorage.setItem("session_id", id);
            });
        }
        else {
            socket.on("newConnection", function (id) {
                localStorage.setItem("session_open", "true");
                localStorage.setItem("session_id", id);
            });
        }
    }

    $("import").each(function () {
        var htmlFile = $(this).attr("src");
        $(this).load(htmlFile);
    });
});

function importHtml(elt, filename) {
    $(elt).load(filename);
}

function displayProject(elt, project, idButton) {
    var projectName = "Projet #" + (project["id"] + 1) + " - " + project["name"];

    $(elt).html('<div class="project"> \
            <form> \
                <fieldset> \
                    <legend>' + projectName + '</legend> \
                    <img src="' + project["img"] + '" alt="Image"></img> \
                    <div class="header"> \
                        Gain: ' + project["gain"] + ' € / mois<br/> \
                        Crée le: ' + project["date"] + '<br/> \
                    </div> \
                    <div class="description">' + project["description"] + '</div> \
                    <input type="button" id="' + idButton + '" value="Participer !"></input> \
                </fieldset> \
            </form> \
        </div>');

}

function displayContrepartie(elt, name, description) {
    $(elt).html('<div class="contrepartie"> \
            <form> \
                <fieldset> \
                    <legend>' + name + '</legend> \
                    ' + description + '\
                    <input type="button" value="J\'accepte"></input> \
                </fieldset> \
            </form> \
        </div>');
}

function printfObject(object) {

	var output = printfObject2(object);

	alert(output);
}

function printfObject2(object) {
        var output = '';
        for (var property in object) {
            if (object[property] instanceof Object)
                output += printfObject2(object[property]);
            else
                output +=  property + ': ' + object[property] + '\n';
        }

        return output;
}

function sendMessage(myEvent, msg) {
    socket.emit(myEvent, msg);
}