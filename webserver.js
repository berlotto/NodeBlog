
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , passport = require('passport')
  , interaction = require('./server/infrastructure/interaction.js')
  , security = require('./server/infrastructure/security.js')
  , routes = require('./server/infrastructure/routes.js');

/////////////////////////////////
////////Setup and configure//////
/////////ExpressJS Server////////
/////////////////////////////////

var env = process.env.NODE_ENV || 'development',
    config = require('./server/infrastructure/config')[env];
security.init(passport, config);

console.log('start configuring expressJS...');
var server = express();

server.configure(function(){
    server.set('port', process.env.PORT || 3000);
    server.use(express.favicon());
    server.use(express.logger('dev'));
    server.use(express.bodyParser());
    server.use( express.cookieParser() );
    server.use(express.session({ secret: 'Ch!n00k 3tud1o' }));
    server.use(passport.initialize());
    server.use(express.methodOverride());
    server.use(server.router);
    server.use('/app', express.static(path.join(__dirname, '/client/app')));
//    server.use('/admin', express.static(path.join(__dirname, '/client/admin')));
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
console.log('setting up routes with security...');
routes.setupRoutes(server);
socketPromise.then(function(socket){
  routes.setupSockets(socket);
});
