$(document).ready(function () {

    sendMessage("getAllProjects", {});

    sendMessage("newProject", { id: 0, name: "test1", gain: 1600, date: '12.10.2016', description: 'Lorem ipsum dolor sit amet', img: './images/windows.jpg' });
    sendMessage("newProject", { id: 1, name: "test2", gain: 1700, date: '12.10.2016', description: 'Lorem ipsum dosdfsdflor sit amet', img: './images/windows.jpg' });
    sendMessage("newProject", { id: 2, name: "test3", gain: 1800, date: '12.10.2016', description: 'Lorem ipsum dodfsdfsdflor sit amet', img: './images/windows.jpg' });
    sendMessage("newProject", { id: 3, name: "test4", gain: 1900, date: '12.10.2016', description: 'Lorem ipsum dolor sit amet', img: './images/windows.jpg' });
    sendMessage("newProject", { id: 4, name: "test5", gain: 2000, date: '12.10.2016', description: 'Lorem ipsum dosdfsdflor sit amet', img: './images/windows.jpg' });
    sendMessage("newProject", { id: 5, name: "test6", gain: 2100, date: '12.10.2016', description: 'Lorem ipsum dodfsdfsdflor sit amet', img: './images/windows.jpg' });

    /*** Evenement de réception des projets en temps réel ***/

    socket.on('newProject', function (project) {
        $('#projectDisplay').prepend($('<span id="project' + project["id"] + '"></span>'));

        var idButton = "projectButton" + project["id"];

        displayProject("#project" + project["id"], project, idButton);

        var this_project = project;

        $('#' + idButton).click(function () {
            alert(this_project["name"]);

            localStorage.setItem("post", this_project.id);

            window.location = './projet.html';
            /***[TODO] Amener a la page de participation / présentation de projet ***/
        });
    });

});
