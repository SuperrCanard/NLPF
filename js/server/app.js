var app = require('http').createServer(createServer);
var utils = require('./utils');
var fs = require('fs'); 
var url = require('url');
var io = require('socket.io')(app);
var sql = require('./sql');


/*** Données volatiles ***/
var ioArray = []; // Tableau des sockets
var sessions = []; // Tableau des sessions (pour le partage de variable entre les pages côté client)
var hashSessions = []; // Tableau des identifiants de session (pour reconnaitre les différents clients)
var sql_user = []; // Tableau des utilisateurs connectés (pour faire le lien avec les users de la base de données)


/*** Fonction de gestion des requêtes HTTP ***/
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

/*** Ecoute sur le port 8080 et connexion au serveur sql ***/
app.listen(8080);
sql.connection();

/*** Permet de retrouver l'identifiant de session en fonction du hash ***/
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

/*** Bind toutes les fonctions d'interaction avec le client ***/
io.on('connection', function (socket) {
    ioArray.push(socket);
    sessions.push({});
    hashSessions.push(utils.makeId(10)); //1024
    sql_user.push({ user_id: -1 });

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

    /*** Connection ***/

    socket.on("connection", function (user) {
        sql.getUserByEmailPassword(user.email, user.password, function (results) {
            console.log("User tried to connect as " + user.email + " (pass: " + user.password + ")");
            if (results.length == 0)
                console.log("Connection failed");
            else {
                console.log("User is now identified as " + user.email + " (id: " + results[0].user_id + ")");
                sql_user[session_id] = results[0];
            }
            utils.printfObject(results);
        });
    });

    /*** Get user information ***/

    socket.on("getUserInfo", function (nothing) {
        console.log("User has requested his information");
        utils.printfObject(sql_user[session_id]);

        socket.emit("getUserInfo", sql_user[session_id]);
    });

    /*** Disconnection ***/

    socket.on("disconnection", function (nothing) {
        console.log("User has disconnected");
        sql_user[session_id] = { user_id: -1 };
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

        var projectArray = sql.getAllProjectSorted(30, function (projectArray) {
            console.log("The user has requested all projects sorted");
            utils.printfObject(projectArray);

            for (var i = 0; i < projectArray.length; ++i) {
                socket.emit('newProjectSorted', projectArray[i]);
            }
        });


    });

    /*** Contribute to a project ***/

    socket.on('newContribution', function (contribution) {
        sql.addContribution(sql_user[session_id].user_id, contribution.ref_compensation_id, function (results) {
            console.log("User contributed to a project");

            socket.emit('needUpdate', {});
        });

    });

    /*** Add compensation to a project ***/

    socket.on('newCompensation', function (compensation) {
        sql.addCompensation(compensation.ref_project_id, compensation.name, compensation.description, compensation.amount, function (results) {
            console.log("User created a compensation to a project");
        });

    });

    /*** On new project ***/

    socket.on('newProject', function (project) {
        sql.addProject(project.name, project.author, project.description, project.contact, sql_user[session_id].user_id, project.img, project.compensations, function (results) {
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