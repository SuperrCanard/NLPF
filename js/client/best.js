$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});


    socket.on("getSession", function (attr) {
        session = attr;
        sendMessage("getAllProjectsSorted", {});

        /*** Evenement d'update ***/

        socket.on('needUpdate', function (nothing) {
            $('#projectDisplayBest').html("");

            sendMessage("getAllProjectsSorted", {});
        });

        /*** Evenement de réception des projets ***/

        socket.on('getProjectSorted', function (project) {

            var project_id = "project" + project["project_id"];
            var node = $("#" + project_id);

            // Evite les doublons de projet
            if (node.length != 0)
                return;

            $('#projectDisplayBest').append($('<span id="' + project_id + '"></span>'));

            var idButton = "projectButton" + project["project_id"];

            //printfObject(project);

            displayProject("#" + project_id, project, idButton);

            var this_project = project;

            $('#' + idButton).click(function () {

                /***Amener a la page de participation / présentation de projet ***/
                session.project = this_project;

                sendMessage("setSession", session);
                window.location = './project_details.html';
            });
        });
    });

});
