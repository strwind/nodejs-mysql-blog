
var mysql = require('mysql'),
    settings = require('../settings');
var connection = mysql.createConnection({
    host : settings.host,
    port : settings.port,
    database : settings.db_name,
    user : settings.username,
    password : settings.password
});
connection.connect();
module.exports = connection;

