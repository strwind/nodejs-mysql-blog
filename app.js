
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , settings = require('./settings')
  , flash = require('connect-flash');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(flash());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ 
      secret: settings.cookieSecret
   }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.use(function(req,res,next){
    var err = req.flash('error'),
        success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.error = err.length ? err : null;
    res.locals.success = success.length ? success : null;
    next();
});

http.createServer(app).listen(app.get('port'), function(err){
  console.log("Express server listening on port " + app.get('port'));
});

routes(app);