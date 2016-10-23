$(document).ready(function () {

    var post = localStorage.getItem("post");

    sendMessage("getProject", post);

    var this_project = null;

    socket.on('getProject', function (project) {
        this_project = project;

        /***[TODO] Modifier les différentes informations de la page en fonction du projet récupéré ***/
        $("#projectTitle").text(this_project["name"]);
        //etc.
    });

});
