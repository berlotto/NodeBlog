
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , passport = require('passport')
  , global = require('./server/infrastructure/global.js')
  , interaction = require('./server/infrastructure/interaction.js')
  , security = require('./server/infrastructure/security.js')
  , routes = require('./server/infrastructure/routes.js');

//Global function configuration
global.init();


/////////////////////////////////
////////Setup and configure//////
/////////Express JS Server////////
/////////////////////////////////


var env = process.env.NODE_ENV || 'development',
    config = require('./server/infrastructure/config')[env];

//initialize passport
passport = security.init(passport, config);

console.log('start configuring expressJS...');
var server = express();

server.configure(function(){
    server.set('port', process.env.PORT || 3000);
    server.use(express.favicon());
    server.use(express.logger('dev'));
    server.use(express.bodyParser());
    server.use(express.cookieParser() );
    server.use(express.session({ secret: 'Ch!n00k 3tud1o', key: 'sid' }));
    server.use(express.methodOverride());
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(server.router);
    server.use('/app', express.static(path.join(__dirname, '/client/app')));
    server.use('/shared', express.static(path.join(__dirname, '/shared')));
    server.use(require('prerender-node').set('prerenderToken', 'RMhpOd2vK9oc7LFMJo8O'));
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
console.log('finishing up routes with security...');

console.log('finishing up sockets...');
socketPromise.then(function(socket){
    routes.setupSockets(socket);
});