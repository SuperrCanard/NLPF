$(document).ready(function () {

    var session = {};

    sendMessage("getSession", {});

    socket.on("getSession", function (attr) {
        session = attr;

        $("#confirm1").text("Vous confirmez votre participation à hauteur de " + session.compensation.amount + " euros par mois au projet " + session.project.name + " de " + session.project.author);

        var compensation_id = "compensation" + session.compensation.compensation_id;

        $('#compensations').prepend($('<span id="' + compensation_id + '"></span>'));

        var idButton = "CompensationButton" + session.compensation.compensation_id;
        displayCompensationParticipate2("#" + compensation_id, session.compensation, idButton);

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
