
var mysql = require('./db');

function Post(username, title, post, time) {
    this.user = username;
    this.title= title;
    this.post = post;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
}
Post.prototype.save = function save(callback) {
    var post = {
        user: this.user,
        title:this.title,
        post: this.post,
        time: this.time,
    };
    var query = mysql.query('INSERT INTO posts SET ?', post, function(err, result) {
        if(err){
            callback(err);
        }
        console.log(result);
        callback(err, result);
    });
};
//几个路由共用，所以为静态方法
Post.get = function get(username, callback) {
    var query = username || '*';
    var sql = 'SELECT '+ query +' FROM posts';
    mysql.query(sql, function(err, rows, fields) {
         if (err) {
             callback(err);
         }
         rows.forEach(function (row, index) {
            var now = row.time;
            row.time = now.getFullYear() + "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
         });
         rows.reverse();//倒序排列
         callback(null, rows);
    });
};

module.exports = Post;
