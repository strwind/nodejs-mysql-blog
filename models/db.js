
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

/*
connection.query('SELECT * FROM users', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

connection.end();
*/