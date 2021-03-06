var pg = require('pg');
var utils = require('./utils');
var client = null;

function addCompensation(projectId, name, description, amount, callback) {
    var real_results = [];

    var str = "INSERT INTO \"compensation\" VALUES (default, '" + name + "', '" + description + "', " + amount + ", " + projectId + ") RETURNING compensation_id, name, description, amount, ref_project_id";
    var query = client.query(str);

    console.log("addCompensation: " + str);

    query.on('row', function (row) {
        real_results.push(row);
    });

    query.on('end', function (results) {
        callback(real_results, true);
    });

    query.on('error', function (err) {
        callback(err, false);
        console.log('Query error: ' + err);
    });
}

function updateTotalAmountProject(projectId, callback) {
    var real_results = [];
    var totals = [];

    var str = "SELECT SUM(compensation.amount) AS \"total_amount\" FROM \"project\", \"contribution\", \"compensation\" WHERE \"project\".project_id = \"compensation\".ref_project_id AND \"contribution\".ref_compensation_id = \"compensation\".compensation_id AND \"project\".project_id = " + projectId;
    var query = client.query(str);

    console.log("updateTotalAmountProject: " + str);

    query.on('row', function (row) {
        totals.push(row);
    });

    query.on('end', function (results) {
        var total = totals[0].total_amount;
        var str2 = "UPDATE \"project\" SET total_amount = " + total + " WHERE project_id = " + projectId;
        console.log("updateTotalAmountProject: " + str2);

        var query2 = client.query(str2);

        query2.on('row', function (row) {
            real_results.push(row);
        });

        query2.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });

        query2.on('end', function (results) {
            callback(real_results, true);
        });
    });

    query.on('error', function (err) {
        callback(err, false);
        console.log('Query error: ' + err);
    });
}

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
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    addCompensation: function (projectId, name, description, amount, callback) {
        var real_results = [];

        var str = "INSERT INTO \"compensation\" VALUES (default, '" + name + "', '" + description + "', " + amount + ", " + projectId + ") RETURNING compensation_id, name, description, amount, ref_project_id";
        var query = client.query(str);

        console.log("addCompensation: " + str);

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    addProject: function (name, author, description, contact, userId, img, compensations, callback) {
        var real_results = [];

        var str = "INSERT INTO \"project\" VALUES (default, '" + name + "', '" + author + "', 0, '" + description + "', '" + contact + "', '" + img + "', " + userId + ", now()) RETURNING project_id, name, author, total_amount, description, contact, image, ref_user_id, date;";
        var query = client.query(str);

        console.log("addProject: " + str);

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {

            for (var i = 0; i < compensations.length; ++i) {
                addCompensation(real_results[0].project_id, compensations[i].name, compensations[i].description, compensations[i].amount, function (results, success) { });
            }

            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    addContribution: function (userId, compensationId, callback) {
        var real_results = [];

        var str = "INSERT INTO \"contribution\" VALUES (default, now(), " + userId + ", " + compensationId + ") RETURNING contribution_id, date, ref_user_id, ref_compensation_id";
        var query = client.query(str);

        console.log("addContribution: " + str);

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            var ref_project_id = [];
            var str2 = "SELECT ref_project_id FROM compensation WHERE compensation.compensation_id = " + compensationId;
            var query2 = client.query(str2);

            query2.on('row', function (row) {
                ref_project_id.push(row);
            });

            query2.on('end', function (results) {
                updateTotalAmountProject(ref_project_id[0].ref_project_id, function (results, success) {
                    callback(real_results, success);
                });
            });

            query2.on('error', function (err) {
                callback(err, false);
                console.log('Query error: ' + err);
            });

        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    deleteContribution: function (userId, compensationId, callback) {
        var real_results = [];

        var str = "DELETE FROM \"contribution\" WHERE \"contribution\".ref_user_id = " + userId + " AND \"contribution\".ref_compensation_id = " + compensationId;
        var query = client.query(str);

        console.log("deleteContribution: " + str);

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            var ref_project_id = [];
            var str2 = "SELECT ref_project_id FROM compensation WHERE compensation.compensation_id = " + compensationId;
            var query2 = client.query(str2);

            query2.on('row', function (row) {
                ref_project_id.push(row);
            });

            query2.on('end', function (results) {
                updateTotalAmountProject(ref_project_id[0].ref_project_id, function (results, success) {
                    callback(real_results, success);
                });
            });

            query2.on('error', function (err) {
                callback(err, false);
                console.log('Query error: ' + err);
            });

        });

        query.on('error', function (err) {
            callback(err, false);
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
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getNbProjectContributor: function (project_id, callback) {
        var real_results = [];

        var str = "SELECT COUNT(DISTINCT user.id) FROM \"project\", \"contribution\" WHERE project.project_id = contribution.ref_project_id AND project.project_id = " + project_id;
        var query = client.query(str);

        console.log("getNbProjectContributor: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getAllProjectSorted: function (number, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"project\" ORDER BY project.total_amount DESC LIMIT " + number;
        var query = client.query(str);

        console.log("getAllProjectSorted: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
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
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
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
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getUserById: function (id, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"user\" WHERE \"user\".user_id = " + id;
        var query = client.query(str);

        console.log("getUserById: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getCompensationById: function (id, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"compensation\" WHERE \"compensation\".compensation_id = " + id;
        var query = client.query(str);

        console.log("getCompensationById: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getContributionById: function (id, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"contribution\" WHERE \"contribution\".contribution_id = " + id;
        var query = client.query(str);

        console.log("getContributionById: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
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
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    updateTotalAmountProject: function (projectId, callback) {
        var real_results = [];
        var totals = [];

        var str = "SELECT SUM(compensation.amount) AS \"total_amount\" FROM \"project\", \"contribution\", \"compensation\" WHERE \"project\".project_id = \"compensation\".ref_project_id AND \"contribution\".ref_compensation_id = \"compensation\".compensation_id AND \"project\".project_id = " + projectId;
        var query = client.query(str);

        console.log("updateTotalAmountProject: " + str);

        query.on('row', function (row) {
            totals.push(row);
        });

        query.on('end', function (results) {
            var total = totals[0].total_amount;
            var str2 = "UPDATE \"project\" SET total_amount = " + total + " WhERE project_id = " + projectId;
            console.log("updateTotalAmountProject: " + str2);

            var query2 = client.query(str2);

            query2.on('row', function (row) {
                real_results.push(row);
            });

            query2.on('error', function (err) {
                callback(err, false);
                console.log('Query error: ' + err);
            });

            query2.on('end', function (results) {
                callback(real_results, true);
            });
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    },

    getUserByEmailPassword: function (email, password, callback) {
        var real_results = [];

        var str = "SELECT * FROM \"user\" WHERE \"user\".email = '" + email + "' AND \"user\".password = '" + password + "'";
        var query = client.query(str);

        console.log("getUserByEmailPassword: " + str)

        query.on('row', function (row) {
            real_results.push(row);
        });

        query.on('end', function (results) {
            callback(real_results, true);
        });

        query.on('error', function (err) {
            callback(err, false);
            console.log('Query error: ' + err);
        });
    }

}