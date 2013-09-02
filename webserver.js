
/**
 * Module dependencies.
 */

var express = require('express')
  , connect = require('connect')
  , path = require('path')
  , interaction = require('./server/infrastructure/interaction.js')
  , routes = require('./server/infrastructure/routes.js');

/////////////////////////////////
////////Setup and configure//////
/////////ExpressJS Server////////
/////////////////////////////////
var server = express();

server.configure(function(){
    server.set('port', process.env.PORT || 3000);
    server.use(express.favicon());
    server.use(express.logger('dev'));
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use(express.static(path.join(__dirname, '/client/app')));
    server.use('/public', express.static(path.join(__dirname, '/public')));
});

server.configure('development', function(){
    server.use(express.errorHandler());
});

var serverListener = server.listen(server.get('port'), function(){
  console.log("Express server listening on port " + server.get('port'));
});

////////////////////////////////
////////Setup Socket.IO/////////
////////for interaction/////////
////////////////////////////////
console.log('setting up sockets...');
var socketPromise = interaction.initSockets(serverListener);

////////////////////////////////
////////Setting up the routes/////////
////////for this application/////////
////////////////////////////////
routes.setupRoutes(server);
socketPromise.then(function(socket){
  routes.setupSockets(socket);
});
