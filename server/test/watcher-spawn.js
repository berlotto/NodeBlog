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
  fs = require('fs'),
  spawn = require('child_process').spawn,
  filename = process.argv[2];

if (!filename) {
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
   let
      ls = spawn('ls', ['-lh', filename]),
      output = '';
   ls.stdout.on('data', function(chunk){
      console.log('receiving...', chunk.toString());
      output += chunk.toString();
   });

   ls.on('close', function(){
      let parts = output.split(/\s+/);
      console.dir([parts[0], parts[4], parts[8]]);
   });
});
console.log("Now watching " + filename + " for changes...");


