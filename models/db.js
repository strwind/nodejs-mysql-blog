
var mysql = require('mysql'),
    settings = require('../settings');
var connection = mysql.createConnection({
    host : settings.host,
    database : 'blog_mysql',
    user : 'root',
    password : ''
});
connection.connect();
module.exports = connection;
