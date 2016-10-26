var app = require('http').createServer(createServer);
var utils = require('./utils');
var fs = require('fs'); 
var url = require('url');
var io = require('socket.io')(app);
var sql = require('./sql');

var ioArray = [];
var sessions = [];
var hashSessions = [];

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var htmldir = __dirname + "/../..";
    
    var fsCallback = function (error, data) {
        if (error) {
            doc = fs.readFile(htmldir + "/index.html", fsCallback);
        }
        else {
            res.writeHead(200);
            res.write(data);
            res.end();
        }
    }

    if (path == "/" || path == "") {
        doc = fs.readFile(htmldir + "/index.html", fsCallback);
    }
    else {
        doc = fs.readFile(htmldir + path, fsCallback);
    }
}

app.listen(8080);
sql.connection();

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
    hashSessions.push(utils.makeId(10)); //1024

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

    /*** Add a user ***/

    socket.on("newUser", function (user) {
        sql.addUser(user.name, user.firstname, user.email, user.password, function (results) {
            console.log("User added to the database");
            utils.printfObject(results);
        });
    });

    /*** Send all projects to the user ***/

    socket.on("getAllProjects", function (nothing) {
        sql.getAllProject(function (projectArray) {
            console.log("The user has requested all projects");
            utils.printfObject(projectArray);

            for (var i = 0; i < projectArray.length; ++i) {
                socket.emit('newProject', projectArray[i]);
            }
        });

    });

    /*** Send all projects sorted to the user ***/

    socket.on("getAllProjectsSorted", function (nothing) {

        var projectArray = sql.getAllProjectSorted(function (projectArray) {
            console.log("The user has requested all projects sorted");
            utils.printfObject(projectArray);

            for (var i = 0; i < projectArray.length; ++i) {
                socket.emit('newProject', projectArray[i]);
            }
        });


    });

    /*** On new project ***/

    socket.on('newProject', function (project) {
        sql.addProject(project.name, project.description, project.contact, project.userId, project.img, function (results) {
            console.log("New project added");
            utils.printfObject(results);

            io.emit('newProject', results);
        });

    });

    /*** Set session content ***/

    socket.on("setSession", function (attr) {
        console.log("The user has set the session");

        utils.printfObject(attr);
        sessions[session_id] = attr;
    });

    /*** Get a specific project ***/

    socket.on('getProject', function (projectId) {

        var project = sql.getProjectById(projectId, function (results) {
            console.log("project '" + projectId + "' requested");

            utils.printfObject(project);

            socket.emit('getProject', project);
        });

    });

    /*** Get session content ***/

    socket.on("getSession", function (nothing) {
        console.log("User '" + session_id + "' has requested his session");
        socket.emit("getSession", sessions[session_id]);
    });

});



  // wait for the event raised by the client
  