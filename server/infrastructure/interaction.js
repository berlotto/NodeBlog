var io = require('socket.io'),
    util = require('util'),
    comments = require('../services/comments');

var masterMoveEvent = 'masterMove',
    gameSetupEvent = 'gameSetup',
    clientMoveEvent = 'slaveMove';

//server is expressJS instance
var setupSockets = function(server){
    var exprIo = io.listen(server);

    //Setup socket IO connections with clients
    //1. Initiate a session for each client and save into redis cache
    //2. Save posts and comments into MongoDB
    //3. Update/Synchronize posts and comments with Broadcasts
    exprIo.sockets.on('connection', function(socket){
        //Initiate a session for each client and save into redis cache
        console.log('Client Connected ' + new Date());
        socket.on(gameSetupEvent, function(comments){
            console.log('socket server => ' + gameSetupEvent + ' ::   ' + JSON.stringify(comments));
        });
        socket.on(masterMoveEvent, function(comments){
            console.log('socket server => ' + masterMoveEvent + ' ::   ' + JSON.stringify(comments));

            socket.broadcast.emit("server-master-move", comments);
            //socket.emit("server-master-move", comments);
        });
        //Disconnection setup
        socket.on('disconnect', function(){
            console.log('Client Disconnected.');
        });
    });
};

module.exports.setupSockets = setupSockets;