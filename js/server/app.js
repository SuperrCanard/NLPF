
/*var http = require('http');
var port = 80;
http.createServer(function (req, res) {}).listen(port);*/

function printfObject(object) {

	var output = printfObject2(object);

	console.log(output);
}

function printfObject2(object) {

	var output = '';
	for (var property in object) {
		if (object[property] instanceof Object)
			output += printfObject2(object[property]);
		else
 	 		output += property + ': ' + object[property] + '\n';
	}

	return output;
}

var app = require('http').createServer(function() {})
var io = require('socket.io')(app);
var storeData = [];
var ioArray = [];

app.listen(8080);


io.on('connection', function (socket) {
	ioArray.push(socket);

  	socket.emit('refreshArray', storeData);

  socket.on('myOnClick', function (data) {  
  	storeData.push(data);
  	printfObject(storeData);

  	/*for (var sock in ioArray) {
  		ioArray[sock].emit('refreshArray', storeData);
  	}*/
  	io.emit('refreshArray', storeData);
  });

  	
});



  // wait for the event raised by the client
  