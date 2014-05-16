/***
 * Excerpted from "Node.js the Right Way",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode for more book information.
 ***/
"use strict";
const

   net = require('net'),

   server = net.createServer(function(connection) {

      console.log('Subscriber connected');

      // send the first chunk immediately
      connection.write(
         '{"type":"changed","file":"targ'
      );

      // after a one second delay, send the other chunk
      let timer = setTimeout(function(){
         connection.write('et.txt","timestamp":1358175758495}' + "\n");
      }, 1000);

      let timer1 = setTimeout(function(){
         connection.write('{"type":"changed","file":"test2.txt","timestamp":1358175434534}' + "\n");
         connection.end();
      }, 2000);

      // clear timer when the connection ends
      connection.on('end', function(){
         clearTimeout(timer);
         clearTimeout(timer1);
         console.log('Subscriber disconnected');
      });

   });

server.listen(8123, function() {
   console.log('Test server listening for subscribers...');
});

