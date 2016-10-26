var pg = require('pg');
var client = null;

module.exports = {

    connection: function () {
        client = new pg.Client("postgres://postgres:root@localhost:5432/crowdfunding");
        client.connect();
    },

    addUser: function (name, firstname, email, password, callback) {
        var real_results = [];

        var str = "INSERT INTO \"user\" VALUES (default, '" + name + "', '" + firstname + "', '" + email + "', '" + password + "') RETURNING user_id, name, firstname, email, password;";
        var query = client.query(str);

        console.log("addUser: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    addProject: function (name, description, contact, userId, img, callback) {
        var real_results = [];

        var str = "INSERT INTO \"project\" VALUES (default, '" + name + "', 0, '" + description + "', '" + contact + "', '" + img + "', " + userId + ", now()) RETURNING project_id, name, total_amount, description, contact, image, ref_user_id, date;";
        var query = client.query(str);

        console.log("addProject: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    addCompensation: function (projectId, name, description, amount, callback) {
        var real_results = [];

        var str = "INSERT INTO \"compensation\" VALUES (default, '" + name + "', '" + description + "', " + amount + ", " + projectId + ") RETURNING compensation_id, name, description, amount, ref_project_id";
        var query = client.query(str);

        console.log("addCompensation: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    getAllProject: function (callback) {
        var real_results = [];

        var str = "SELECT * FROM \"project\"";
        var query = client.query(str);

        console.log("getAllProject: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    getAllProjectSorted: function (number, callback) {
        var real_results = [];

        /*** [TODO] Rajouter la formule du prof pour pouvoir faire l'order by Count(X) ***/
        var str = "SELECT * FROM \"project\" ORDER BY xxx LIMIT " + number;
        var query = client.query(str);

        console.log("getAllProjectSorted: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    getProjectByUser: function (id, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"project\" WHERE \"project\".ref_user_id = " + id;
        var query = client.query(str);

        console.log("getProjectByUser: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });

    },

    getProjectById: function (id, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"project\" WHERE \"project\".project_id = " + id;
        var query = client.query(str);

        console.log("getProjectById: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    getCompensationByProject: function (projectId, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"compensation\" WHERE \"compensation\".ref_project_id = " + projectId;
        var query = client.query(str);

        console.log("getCompensationByProject: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    },

    getUserByEmailPassword: function (email, password, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"user\" WHERE \"user\".email = " + email + " AND \"user\".password = " + password;
        var query = client.query(str);

        console.log("getUserByEmailPassword: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results);
        });

        query.on('error', function (err) {
            console.log('Query error: ' + err);
        });
    }

}