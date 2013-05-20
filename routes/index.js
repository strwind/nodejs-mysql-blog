var crypto = require('crypto'),
    User = require('../models/user.js'),
    Post = require('../models/post.js');
module.exports = function(app){	
　　app.get('/', function(req,res){
        Post.get(null, function(err, posts){
            if(err){
                posts = [];
            }
            res.render('index',{
                title: '主页',
                user: req.session.user,
                posts: posts,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/reg', checkNotLogin);
    app.get('/reg', function(req,res){
        res.render('reg',{
            title:'注册',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        }); 
    });

    app.post('/reg', checkNotLogin);
    app.post('/reg', function(req,res){
        if(req.body['password-repeat'] != req.body['password']){
            req.flash('error','两次输入的口令不一致'); 
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var newUser = new User({
            name: req.body.username,
            password: password
        });
        User.get(newUser.name, function(err, user){
            if(user){
                err = '用户已存在';
            }
            if(err){
                req.flash('error', err);
                return res.redirect('/reg');
            }
            newUser.save(function(err){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;
                req.flash('success','注册成功');
                res.redirect('/');
            });
        });
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res){
        res.render('login',{
            title:'登录',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        }); 
    });

    app.post('/login', checkNotLogin);
    app.post('/login', function(req, res){
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('base64');
        User.get(req.body.username, function(err, user){
            if(!user){
                req.flash('error', '用户不存在'); 
                return res.redirect('/login'); 
            }
            if(user.password != password){
                req.flash('error', '密码错误'); 
                return res.redirect('/login');
            }
            req.session.user = user;
            req.flash('success','登陆成功');
            res.redirect('/');
        });
    });

    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res){
        req.session.user = null;
        req.flash('success','登出成功');
        res.redirect('/');
	});

	app.get('/post', checkLogin);
    app.get('/post', function(req, res){
        res.render('post',{
            title:'发表',
            user:req.session.user,
            success:req.flash('success').toString(),
            error:req.flash('error').toString()
        }); 
    });
    
	app.post('/post', checkLogin);
    app.post('/post', function(req, res){
        var currentUser = req.session.user,
            post = new Post(currentUser.name, req.body.title, req.body.post);
        post.save(function(err){
            if(err){
                req.flash('error', err); 
                return res.redirect('/');
            }
            req.flash('success', '发布成功!');
            res.redirect('/');
        });
    });

    //单页面
    app.get('/single/:id', function(req, res) {
        var query = 'id = ' +  req.params.id;
        Post.get(query, function(err, posts) {
            if(err) {
                post = {};
            }
            post = posts[0];
            res.render('single', {
                multiPath: 1,
                title: post.title,
                user: req.session.user,
                post: post,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            })
        });
    })
};

function checkLogin(req, res, next){
    if(!req.session.user){
        req.flash('error','未登录'); 
        return res.redirect('/login');
    }
    next();
}


function checkNotLogin(req,res,next){
    if(req.session.user){
        req.flash('error','已登录'); 
        return res.redirect('/');
    }
    next();
}