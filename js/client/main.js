$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});


    socket.on("getSession", function (attr) {
        session = attr;
        sendMessage("getAllProjects", {});

        /*** Evenement de réception des projets en temps réel ***/

        socket.on('newProject', function (project) {
            $('#projectDisplay').prepend($('<span id="project' + project["id"] + '"></span>'));

            var idButton = "projectButton" + project["id"];

            displayProject("#project" + project["id"], project, idButton);

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
