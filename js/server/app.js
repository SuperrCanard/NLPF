var app = require('http').createServer(createServer);
var utils = require('./utils');
var fs = require('fs'); 
var url = require('url');
var io = require('socket.io')(app);
var projectArray = [];
var ioArray = [];
var sessions = [];
var hashSessions = [];

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var htmldir = __dirname + "/../..";
    
    var fsCallback = function (error, data) {
        if (error) {
            doc = fs.readFile(htmldir + "/index.html", fsCallback);
            //console.log(error);
        }
        else {
            res.writeHead(200);
            res.write(data);
            res.end();
        }
    }

   /* switch(path) {
        case '/test': {
          console.log(htmldir + '/test')
          //doc = fs.readFile(htmldir + '/subpage.html', fsCallback);
          break;
        }

        case '/test2': {
            console.log(htmldir+ '/test2')
            //doc = fs.readFile(htmldir + '/subpage.html', fsCallback);
           break;
        }

    default: 
        {
            console.log("asked: " + path);
            console.log(htmldir + '/index.html')
            doc = fs.readFile(htmldir + '/index.html', fsCallback);
            break;
        }
    }*/

   // console.log("Accessing " + htmldir + path + " ...");
    if (path == "/" || path == "") {
        doc = fs.readFile(htmldir + "/index.html", fsCallback);
    }
    else {
        doc = fs.readFile(htmldir + path, fsCallback);
    }
}

function makeId(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.listen(8080);

function getSessionByHash(hash) {
    if (!hash)
        return -2;

    for (var i = 0; i < hashSessions.length; ++i)
    {
        if (hashSessions[i] == hash)
            return i;
    }

    return -1;
}


io.on('connection', function (socket) {
    ioArray.push(socket);
    sessions.push({});
    hashSessions.push(makeId(1024));

    var session_id = sessions.length - 1;
    var user_id = ioArray.length - 1;

    console.log("New user: " + user_id + " (hash = " + hashSessions[session_id] + ")");

    /*** Send the session id to the user ***/

    socket.emit("newConnection", hashSessions[session_id]);

    /*** Set current user session ***/

    socket.on("newConnection", function (hashsession) {

        console.log("User sent his hash: " + hashsession);
        var requested_session = getSessionByHash(hashsession);
        if (requested_session < 0) {
            console.log("User with hash '" + hashsession + "' does not exist. Keeping '" + session_id + "'");
            socket.emit('badConnection', hashSessions[session_id]);
        }
        else {
            session_id = requested_session;
            console.log("User '" + user_id + "' has identified as user '" + requested_session + "'");
        }
    });

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

    /*** Set session content ***/

    socket.on("setSession", function (attr) {
        utils.printfObject(attr);
        sessions[session_id] = attr;
    });

    /*** Get a specific project ***/

    socket.on('getProject', function (project) {
        utils.printfObject(project);

        socket.emit('getProject', projectArray[parseInt(project)]);
    });

    /*** Get session content ***/

    socket.on("getSession", function (nothing) {
        console.log("User '" + session_id + "' has requested his session");
        socket.emit("getSession", sessions[session_id]);
    });

});



  // wait for the event raised by the client
  