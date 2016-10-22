$( document ).ready(function() {

	function printfObject2(object) {

	var output = '';
	for (var property in object) {
		if (object[property] instanceof Object)
			output += printfObject2(object[property]);
		else
 	 		output += object[property] + '<br>';
	}

	return output;
}

	function sendMessage(socket, myEvent, msg) {
      socket.emit(myEvent, {'data': msg});
    }

    var socket = io.connect('http://localhost:8080');

    $("#id_submit").on('click', function() {
    	sendMessage(socket, 'myOnClick', $("#id_nom").val());
    });

    socket.on('refreshArray', function(message){


    	$('#message').append($('<li>')).html(printfObject2(message));
    });
});
