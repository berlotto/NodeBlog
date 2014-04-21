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
      q = require('q');

   var _getFiles =  function(name, maxSize){
      var deferred = q.defer();

      //noinspection JSUnresolvedVariable
      var imagePath = path.join(__dirname, '../../images/' + name);
      console.log('reading imagePath', imagePath);
      fs.readdir(imagePath, function(err, files){
         if(err || !files) {
            deferred.reject(err);
         }
         var file;
         if(maxSize > files.length){
            maxSize = files.length;
         }
         var results = [];
         for(var i = 0; i < maxSize; i++){
            file = files[i];
            //get stats for the file
            var stat = fs.statSync(path.join(imagePath, file));
            console.log(JSON.stringify(stat));
            var item = {url: '/images/' + name + '/{res}/' + file,
               thumbnail:'/images/' + name + '/80/' + file,
               size: stat.size, uploadedOn: stat.atime};
            results.push(item);
         }
         deferred.resolve(results);
      });
      return deferred.promise;
   };



   exports.getImages = function(req, res){
      console.log('req.params', req.params);
      _getFiles(req.params.name, req.params.max).then(function(files){
         res.send(files);
      });
   };

})(module.exports);