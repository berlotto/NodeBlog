var io = require('socket.io'),
    q = require('q');
    util = require('util');

//server is expressJS instance
var setupSockets = function(server){
  var exprIo = io.listen(server);
  var deferred = q.defer();
  //Setup socket IO connections with clients
  //1. Initiate a session for each client and save into redis cache
  //2. Save posts and comments into MongoDB
  //3. Update/Synchronize posts and comments with Broadcasts
  exprIo.sockets.on('connection', function(socket){
      //Initiate a session for each client and save into redis cache
    console.log('Client Connected ' + new Date());
    socket.on('comment-added', function(comment){
        console.log('socket server => comment-added' + JSON.stringify(comment));
    });
    socket.on('comment-updated', function(comment){
        console.log('socket server => comment-updated' + JSON.stringify(comment));
    });
    //Disconnection setup
    socket.on('disconnect', function(){
        console.log('Client Disconnected.');
    });
    deferred.resolve(socket);
  });
  return deferred.promise;
};

module.exports.setupSockets = setupSockets;