$(document).ready(function () {

    $("import").each(function () {
        var htmlFile = $(this).attr("src");
        $(this).load(htmlFile);
    });
});

function importHtml(elt, filename) {
    $(elt).load(filename);
}

function displayProject(elt, projectName, gain, date, img, description) {
    $(elt).html('<div class="project"> \
            <form> \
                <fieldset> \
                    <legend>' + projectName + '</legend> \
                    <img src="' + img + '" alt="Image"></img> \
                    <div class="header"> \
                        Gain: ' + gain + ' € / mois<br/> \
                        Crée le: ' + date + '<br/> \
                    </div> \
                    <div class="description">' + description + '</div> \
                    <input type="button" value="Participer !"></input> \
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
        var output = '';
        for (var property in object) {
            if (object[property] instanceof Object)
                output += printfObject(object[property]);
            else
                output += object[property] + '<br>';
        }

        return output;
}

function sendMessage(socket, myEvent, msg) {
    socket.emit(myEvent, { 'data': msg });
}