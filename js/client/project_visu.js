$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});

    socket.on("getSession", function (attr) {
        session = attr;

        var this_project = session.project;

        /***[TODO] Modifier les différentes informations de la page en fonction du projet récupéré ***/
        $("#projectTitle").text(this_project["name"]);
        //etc.
    });

});
