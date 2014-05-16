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
   client = net.connect({port: 8123});
let buffer = '';
client.on('data', function(data) {
   console.log("Raw data", data);
   buffer += data;
   let boundary = buffer.indexOf('\n');
   while (boundary !== -1) {
      let input = buffer.substr(0, boundary);
      buffer = buffer.substr(boundary + 1);
      console.log('JSON.parse(input)', JSON.parse(input));
      boundary = buffer.indexOf('\n');
   }
});

