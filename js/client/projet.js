$(document).ready(function () {

    var post = JSON.parse(localStorage.getItem("post"));

    //sendMessage("getProject", post);

    var this_project = post["project"];

    /***[TODO] Modifier les différentes informations de la page en fonction du projet récupéré ***/
    $("#projectTitle").text(this_project["name"]);
    //etc.

});
