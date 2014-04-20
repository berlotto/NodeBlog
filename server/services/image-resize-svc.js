(function(exports){
   var im = require('imagemagick'),
      fs = require('fs'),
      path = require('path'),
      storageSvc = require('./storage-svc'),
      Q = require('q'),
      _ = require('lodash');

   var resize = function(fileName, width, baseFolder) {

      var result = storageSvc.createFolder(width.toString(), baseFolder).then(function(outputFolder){
         var dstPath = path.join(outputFolder, fileName);
         var srcPath = path.join(baseFolder, fileName);
         console.log('srcPath exists :: ', srcPath);

         fs.exists(srcPath, function(exists){
             if(exists){
                console.log('srcPath exists :: ', srcPath);

                im.resize({
                   srcPath: srcPath,
                   dstPath: dstPath,
                   width: width
                }, function (err, stdout, stderr) {
                   if (err) {
                      throw err;
                   }
                   else{
                      return true;
                   }
                   console.log('Re-sized ' + fileName + ' to fit within ' + width + 'px');
                });
             }
            else{
                console.log('srcPath does not exists :: ', srcPath);
             }
         });
      });

      return result;
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

   exports.resize = function(fileNames, options, baseFolder){
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

   exports.resizeByFolder = function(folder, options){
      return storageSvc.getImageNamesInFolder(folder).then(function(fileNames){
         //console.log('resizeByFolder.fileNames', fileNames);
         var size = 100;
//         for(var i = 0; i < fileNames.length; i = i + size){
//            var temp = fileNames.slice(i, size + i);
//            console.log('temp', i, size, temp);
//            //resizeMany(fileNames, options, folder);
//
//         }
         var temp = fileNames.slice(0, 20);
         console.log('temp', 0, 20, temp);
         resizeMany(temp, options, folder);
      });
   };
})(module.exports);

