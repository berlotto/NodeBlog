(function(){
   var im = require('imagemagick');
   var fs = require('fs');
   var _ = require('lodash');
   var config = require('../infrastructure/config');

   //var input = '/Users/jeffjin/Pictures/_DSC7370.JPG';

   var resize = function(fileName, width, baseFolder) {
      //var stat = fs.statSync(filePath);
      //console.log(filePath, JSON.stringify(stat));
      baseFolder = baseFolder || config.baseImageFolder;
      var output = baseFolder + width + '/' + fileName;
      im.resize({
         srcPath: baseFolder + fileName,
         dstPath: output,
         width: width
      }, function (err, stdout, stderr) {
         if (err) throw err;
         console.log('resized ' + fileName + ' to fit within ' + width + 'px');
      });
   };

   var resizeOne = function(fileName, options, baseFolder){
      _.each(options, function(op){
         resize(fileName, op, baseFolder);
      });
   };

   var resizeMany = function(fileNames, options, baseFolder){
      _.each(fileNames, function(fileName){
         _.each(options, function(op){
            resize(fileName, op, baseFolder);
         });
      });
   };

   module.exports.resize = function(fileNames, options, baseFolder){
      if(!fileNames || !options){
         console.error('Invalid file name or options!', fileNames, options);
         return;
      }
      if(fileNames.length > 0){
         resizeMany(fileNames, options, baseFolder);
      }
      else{
         resizeOne(fileNames, options, baseFolder);
      }
   };
})();

