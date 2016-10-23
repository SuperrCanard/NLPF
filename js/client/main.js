$(document).ready(function () {

    displayProject("#projet1", "Projet #1 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");
    displayProject("#projet2", "Projet #2 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");
    displayProject("#projet3", "Projet #3 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");
    displayProject("#projet4", "Projet #1 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");
    displayProject("#projet5", "Projet #2 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");
    displayProject("#projet6", "Projet #3 - Sympa", "1652", "15.10.2016", "./images/windows.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum lectus ultricies dolor rhoncus volutpat. Aliquam facilisis vel enim at viverra. Sed consectetur dapibus sagittis. Fusce metus urna, finibus in porttitor suscipit, suscipit at eros. Nunc finibus elit ullamcorper, convallis dolor ac, viverra sem. Nullam pulvinar maximus ex. Proin in metus purus. Suspendisse nec tortor ut purus tincidunt commodo auctor vel lacus. Fusce nec hendrerit purus. Curabitur vitae eros vitae nisi scelerisque iaculis. ");


    

    var socket = io.connect('http://localhost:8080');

    $("#id_submit").on('click', function () {
        sendMessage(socket, 'myOnClick', $("#id_nom").val());
    });

    socket.on('refreshArray', function (message) {


        $('#message').append($('<li>')).html(printfObject2(message));
    });
});
