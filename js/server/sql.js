var pg = require('pg');
var client = null;

module.exports = {
    
    connection: function() {
        client = new pg.Client("postgres://postgres:root@localhost:5432/crowdfunding");
        client.connect();
    },

    addUser: function(name, firstname, email, password) {
        var str = "INSERT INTO \"user\" VALUES (default, " + name + ", " + firstname + ", " + email + ", " + password + ")";
        var query = client.query(str);

        alert("addUser: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    addProject: function(name, description, contact, userId, date) {
        var str = "INSERT INTO \"project\" VALUES (default, " + name + ", " + description + ", " + contact + ", " + userId + ", " + date + ")";
        var query = client.query(str);

        alert("addProject: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    addCompensation: function(projectId, name, description, amount) {
        var str = "INSERT INTO \"compensation\" VALUES (default, " + name + ", " + description + ", " + amount + ", " + projectId + ")";
        var query = client.query(str);

        alert("addCompensation: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    getAllProject: function() {
        var str = "SELECT * FROM \"project\"";
        var query = client.query(str);

        alert("getAllProject: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    getAllProjectSorted: function(number) {
        /*** [TODO] Rajouter la formule du prof pour pouvoir faire l'order by Count(X) ***/
        var str = "SELECT * FROM \"project\" ORDER BY xxx LIMIT " + number;
        var query = client.query(str);

        alert("getAllProjectSorted: " + str)

        query.on('end', function(results) {
           return results; 
        }); 
    },

    getProjectByUser: function(id) {
        var str = "SELECT * FROM \"project\" WHERE \"project\".ref_user_id = " + id;
        var query = client.query(str);

        alert("getProjectByUser: " + str)

        query.on('end', function(results) {
           return results; 
        });

    },

    getProjectById: function(id) {
        var str = "SELECT * FROM \"project\" WHERE \"project\".project_id = " + id;
        var query = client.query(str);

        alert("getProjectById: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    getCompensationByProject: function(projectId) {
        var str = "SELECT * FROM \"compensation\" WHERE \"compensation\".ref_project_id = " + projectId;
        var query = client.query(str);

        alert("getCompensationByProject: " + str)

        query.on('end', function(results) {
           return results; 
        });
    },

    getUserByEmailPassword: function(email, password) {
        var str = "SELECT * FROM \"user\" WHERE \"user\".email = " + email + " AND \"user\".password = " + password;
        var query = client.query(str);

        alert("getUserByEmailPassword: " + str)

        query.on('end', function(results) {
           return results; 
        });
    }

}