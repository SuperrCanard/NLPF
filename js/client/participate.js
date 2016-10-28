$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});

    socket.emit("getSession", function (attr) {
        session = attr;

        var compensation_id = "compensation" + session.compensation.compensation_id;

        $('#displayCompensation').prepend($('<span id="' + compensation_id + '"></span>'));

        var idButton = "CompensationButton" + session.compensation.compensation_id;

        displayCompensationParticipate("#" + compensation_id, session.compensation, idButton);

        $('#' + idButton).click(function () {

            sendMessage("newContribution", { ref_compensation_id: session.compensation.compensation_id });

            socket.on("newContribution", function (result) {
                if (result.success) {
                    /***[TODO] Afficher message en cas de succès ***/

                    window.location = './index.html';
                }
                else {
                    /***[TODO] Afficher message en cas d'erreur ***/

                }
            });
        });

    });


});
