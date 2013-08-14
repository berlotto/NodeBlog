
/**
 * Module dependencies.
 */

var express = require('express')
  , connect = require('connect')
  , http = require('http')
  , path = require('path')
  , routes = require('./server/infrastructure/routes.js');

var server = express();

server.configure(function(){
    server.set('port', process.env.PORT || 3000);
    server.use(express.favicon());
    server.use(express.logger('dev'));
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(path.join(__dirname, '/client/app')));
    server.use('/public', express.static(path.join(__dirname, '/server/public')));
});

server.configure('development', function(){
    server.use(express.errorHandler());
});

/***************setup infrastructure*******************/
routes.setupRoutes(server);
routes.setupSockets(server);

http.createServer(server).listen(server.get('port'), function(){
  console.log("Express server listening on port " + server.get('port'));
});
