
/**
 * Module dependencies.
 */

var express = require('express')
  , connect = require('connect')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes/routes.js')
  , blogs = require('./repository/blogs.js');

var server = express.createServer();

server.configure(function(){
    server.set('port', process.env.PORT || 3000);
    server.use(express.favicon());
    server.use(express.logger('dev'));
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(path.join(__dirname, 'public')));
});

server.configure('development', function(){
    server.use(express.errorHandler());
});

/***************setup routes*******************/
routes.setupRoutes(server);

http.createServer(server).listen(server.get('port'), function(){
  console.log("Express server listening on port " + server.get('port'));
});
