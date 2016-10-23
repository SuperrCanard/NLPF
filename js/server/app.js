

var app = require('http').createServer(function() {})
var utils = require('./utils');
var io = require('socket.io')(app);
var projectArray = [];
var ioArray = [];

app.listen(8080);


io.on('connection', function (socket) {
    ioArray.push(socket);

    /*** Send all projects to the user ***/

    socket.on("getAllProjects", function (nothing) {
        for (var i = 0; i < projectArray.length; ++i) {
            socket.emit('newProject', projectArray[i]);
        }
    });

    /*** On new project ***/

    socket.on('newProject', function (project) {
        projectArray.push(project);
        utils.printfObject(project);

        io.emit('newProject', project);
    });

    /*** Get a specific project ***/

    socket.on('getProject', function (project) {
        utils.printfObject(project);

        socket.emit('getProject', projectArray[parseInt(project)]);
    });

});



  // wait for the event raised by the client
  