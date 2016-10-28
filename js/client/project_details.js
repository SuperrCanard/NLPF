$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});

    socket.on("getSession", function (attr) {
        session = attr;

        var this_project = session.project;

        /***[TODO] Modifier les différentes informations de la page en fonction du projet récupéré ***/
        //etc.

        displayProject("#project", this_project);

        sendMessage("getCompensationsByProject", this_project.project_id);

        socket.on("getCompensationsByProject", function (result) {
            printfObject(result);
            if (result.success) {
                for (var i = 0; i < result.results.length; ++i) {
                    var compensation_id = "compensation" + result.results[i].compensation_id;

                    $('#compensations').prepend($('<span id="' + compensation_id + '"></span>'));

                    var idButton = "CompensationButton" + result.results[i].compensation_id;
                    displayCompensationParticipate("#" + compensation_id, result.results[i], idButton);
                }
            }
        });

    });

});
