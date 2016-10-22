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