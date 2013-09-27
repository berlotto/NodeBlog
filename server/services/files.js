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
  var fileIcons;

  var _init = function(){
    var deferred = q.defer();
    var temp = path.join(__dirname, '../../client/app/img/FileTypes');
    fs.readdir(temp, function(err, files){
      if(err) {
        deferred.reject(err);;
      }
      var file, temp;
      fileIcons = {};
      for(var i = 0; i < files.length; i++){
        file = files[i];
        temp = file.split('.');
        if(!temp || temp.length <= 1 || !temp[1]){
          continue;
        }
        fileIcons[temp[1]] = file;
      }
      deferred.resolve(fileIcons);
    });
    return deferred.promise;
  };
  var initPromise = _init();

  var _getIconByExt = function(ext){
     if(!fileIcons.png){
       return initPromise.then(function(icons){
         return fileIcons[ext];
       });
     }
     else{
        return fileIcons[ext];
     }
  };

  var _getFiles =  function(){
    var deferred = q.defer();

    //noinspection JSUnresolvedVariable
    var uploadPath = path.join(__dirname, '../uploads');
    fs.readdir(uploadPath, function(err, files){
      if(err) {
        deferred.reject(err);
      }
      var file, temp;
      var results = [];
      for(var i = 0; i < files.length; i++){
        file = files[i];
        console.log(file);
        temp = file.split('.');
        if(!temp || temp.length <= 1 || !temp[1]){
          continue;
        }
        var item = {fileTypeIcon: '', extension:temp[1], name: temp[0], size: '', uploadedOn: ''};
        results.push(item);
      }
      deferred.resolve(results);
    });
    return deferred.promise;
  };



  module.exports.upload = function(req, res){
    console.log(JSON.stringify(req.files.uploadFile.path));
    fs.readFile(req.files.uploadFile.path, function (err, data) {
      console.log('__dirname = ' + __dirname);

      var newPath = path.join(__dirname, '../uploads/' + req.files.uploadFile.filename);
      console.log('newPath = ' + newPath);
      fs.writeFile(newPath, data, function (err) {
        _getFiles().then(function(files){
          res.send(files);
        })
      });
    });
  };

  module.exports.delete = function(req, res){

  };
  module.exports.get = function(req, res){
     _getFiles().then(function(files){
       res.send(files);
     })
  };

})();