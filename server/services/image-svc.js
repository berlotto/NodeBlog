/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){

   var fs = require('fs'),
      path = require('path'),
      storageSvc = require('./storage-svc'),
      _ = require('lodash/dist/lodash.underscore'),
      q = require('q');

   var _getFiles =  function(name, imgRes, pageIndex, pageSize){
      //console.log('_getFiles', name, imgRes, pageIndex, pageSize);

      var imagePath = path.join(__dirname, '../../images/' + name);
      var basePath = path.join(__dirname, '../../');
      console.log('reading imagePath', imagePath, basePath);
      var tempFolders = _.map(imgRes, function(folder){
         return imagePath + '/' + folder;
      });
      var result = storageSvc.findImages(tempFolders);

      return result.then(function (files) {
            //console.log('files', files);
            var result = _.map(files, function (file) {
               var temp = file.replace(basePath, '/');
               var stat = fs.statSync(file);
               return {url: temp,
                  thumbnail:'/images/' + name + '/80/' + path.basename(file),
                  size: stat.size, uploadedOn: stat.ctime};
            });

            result = _.sortBy(result, function(f){
               return f.thumbnail;
            });

            result = result.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize );
            console.log('result', result);
            return result;
         },
         function (err) {
            console.log('error finding images...', err);
         }
      );
   };

   var _getFilesByDate =  function(name, folders, year, month, day){
      console.log('_getFilesByDate', name, folders, year, month, day);

      var imagePath = path.join(__dirname, '../../images/' + name);
      var basePath = path.join(__dirname, '../../');
      var tempFolders = _.map(folders, function(folder){
         return imagePath + '/' + folder;
      });
      var result = storageSvc.findImages(tempFolders);

      return result.then(function (files) {
            //console.log('files', files);
            var result = _.map(files, function (file) {
               var temp = file.replace(basePath, '/');
               var stat = fs.statSync(file);
               //console.log('stat', stat);
               return {url: temp,
                  thumbnail:'/images/' + name + '/80/' + path.basename(file),
                  size: stat.size, uploadedOn: stat.mtime};
            });
            result = _.filter(result, function(f){
               //console.log('date', f.uploadedOn.getYear(), f.uploadedOn.getMonth(), f.uploadedOn.getDate());
               return f.uploadedOn.getYear() === (year - 1900) && f.uploadedOn.getMonth() === (month -1) && f.uploadedOn.getDate() === (day);
            });

            result = _.sortBy(result, function(f){
               return f.thumbnail;
            });

            //console.log('result', result);
            return result;
         },
         function (err) {
            console.log('error finding images...', err);
         }
      );
   };



   exports.getImageFolders = function(req, res){
      var imagePath = path.join(__dirname, '../../images/');
      var imageWidth = req.params.imageWidth;
      var folders = [];
      var folderData = [];
      fs.readdir(imagePath, function (err, files) {
         if (err) {
            throw err;
         }

         folders = files.filter(function (file) {
            return fs.statSync(path.join(imagePath, file)).isDirectory();
         });
         folderData = _.map(folders, function(f){
            return _getFiles(f, [imageWidth], 0, 2).then(function(imgs){
                  console.log('imgs', imageWidth, imgs);
                  return {
                     name: f,
                     title: f.split('-')[0],
                     date: new Date(parseInt(f.split('-')[1]), parseInt(f.split('-')[2]), 0, 0, 0, 0, 0),
                     cover: imgs ? imgs[0] : {}
                  }
               },
               function(err){
                  console.error('_getImageFolders.getThumbnails', err);
                  return {};
               });
         });
         q.all(folderData).then(function(folderResult){
            res.send(folderResult);
         }, function(err){
            console.error('_getImageFolders.resolveAll', err);
            res.send([]);
         });
      });
   };


   exports.getImagesByDate = function(req, res){
      var dateVals = req.params.date.split('-');
      var folders = req.params.folders.split(',');
      _getFilesByDate(req.params.name, folders, parseInt(dateVals[0]), parseInt(dateVals[1]), parseInt(dateVals[2])).then(function(files){
         res.send(files);
      });
   };

   exports.getImages = function(req, res){
      var folders = req.params.folders.split(',');
      _getFiles(req.params.name, folders, req.params.index, req.params.size).then(function(files){
         res.send(files);
      });
   };

})(module.exports);