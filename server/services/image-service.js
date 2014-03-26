/**
 * Created with JetBrains WebStorm.
 * User: jeff jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var q = require('q'),
        fs = require('fs'),
        gm = require('gm');
    require('bufferjs');

    var resize =function(width){
       var inFile = '/Users/jeffjin/img.jpg';
       var stat = fs.statSync(inFile);
       console.log(JSON.stringify(stat));

       gm(inFile)
          .resize(width)
          .stream(function(err, stdout, stderr) {
             var ws = fs.createWriteStream('/Users/jeffjin/imgOut.jpg');
             //console.log('stdout', stdout);
             //console.log('stderr', stderr);

             var i = [];

             stdout.on( 'data', function(data){

                console.log('data');

                i.push( data );


             });

             stdout.on( 'close', function(){

                console.log( 'close' );

                var image = Buffer.concat( i );
                ws.write( image.toString('base64'), 'base64' );
                ws.end();

             });

          });
    };


    exports.resize = resize;
})();


