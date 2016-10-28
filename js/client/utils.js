if (socket == undefined)
    var socket = null;

$(document).ready(function () {

    if (socket == undefined || !socket) {
        socket = io.connect('http://localhost:8080');

        var session_open = localStorage.getItem("session_open");
        if (session_open == "true") {
            var session_id = localStorage.getItem("session_id");
            sendMessage("newConnection", session_id);

            socket.on("badConnection", function (id) {
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
    var projectName = "Projet #" + project["project_id"] + " - " + project["name"];
     var d = String(project["date"]);
    var now =  d.split('T');

    $(elt).html('<div class="panel panel-primary"> \
            <div class = "panel-heading">' + projectName + '</div>\
                <div class = "panel-body"> \
                    <img id="imageproject" src="' + project["image"] + '" alt="Image"></img> \
                     <div class="gain"> \
                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Gain: ' + project["total_amount"] + ' € / mois \
                    </div> \
                    <div class="contact"> \
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Crée le: 28/10/2016<br/> \
                    </div> \
                    <div class="desctitle"><h4>Description<h4></div> \
                    <div class="description">' + project["description"] + '</div> \
                    <button class="btn btn-primary" id="' + idButton + '"">Participer</button> \
                </div> \
        </div>');
}

function displayProjectDetails(elt, project, idButton) {
    var projectName = "Projet #" + project["project_id"] + " - " + project["name"];
    var d = String(project["date"]);
    var now =  d.split('T');

    $(elt).html('<div class="panel panel-primary" id="projectdisp"> \
            <div class = "panel-heading">' + projectName + '</div>\
                <div class = "panel-body"> \
                    <img id="imageproject" src="' + project["image"] + '" alt="Image"></img> \
                     <div class="gain"> \
                        <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Gain: ' + project["total_amount"] + ' € / mois \
                    </div> \
                    <div class="contact"> \
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span> Crée le: 28/10/2016<br/> \
                    </div> \
                    <div class="desctitle"><h4>Description<h4></div> \
                    <div class="description">' + project["description"] + '</div> \
                </div> \
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

function displayCompensationDetails(elt, name, description, amount) {
    $(elt).html('<div class="panel panel-primary" id="com"> \
            <div class = "panel-heading">' + name + " - " + amount + " €" +  '</div>\
                <div class = "panel-body"> \
                    <dl> \
                      <dt>Description</dt> \
                      <dd>' + description + '</dd> \
                    </dl> \
                    <button class="btn btn-primary" onclick="Delete(this)">Supprimer</button> \
                </div> \
        </div>');
}


function displayCompensationParticipate(elt, compensation, idButton) {
    $(elt).html('<div class="panel panel-primary" id="com"> \
            <div class = "panel-heading">' + compensation.name + " - " + compensation.amount + " €" +  '</div>\
                <div class = "panel-body"> \
                    <dl> \
                      <dt>Description</dt> \
                      <dd>' + compensation.description + '</dd> \
                    </dl> \
                    <button class="btn btn-primary" id="' + idButton + '">Participer</button> \
                </div> \
        </div>');
}

function displayCompensationParticipate2(elt, compensation, idButton) {
    $(elt).html('<div class="panel panel-primary" id="com"> \
            <div class = "panel-heading">' + compensation.name + " - " + compensation.amount + " €" +  '</div>\
                <div class = "panel-body"> \
                    <dl> \
                      <dt>Description</dt> \
                      <dd>' + compensation.description + '</dd> \
                    </dl> \
                    <button class="btn btn-primary" id="' + idButton + '">J\'accepte</button> \
                </div> \
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