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

   var fileIcons = {png: 'png.png', cs: 'cs.png', csproj: 'csproj.png', default: 'default.png', dir: 'dir.png',
      doc: 'doc.png',  document: 'document.png',  gif: 'gif.png',  jpg: 'jpg.png',  link: 'link.png',  zip: 'zip.png'};

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
            temp = file.split('.');
            if(!temp || temp.length <= 1 || !temp[1]){
               continue;
            }
            //get stats for the file
            var stat = fs.statSync(path.join(uploadPath, file));
            console.log(JSON.stringify(stat));
            var item = {fileTypeIcon: fileIcons[temp[1]], extension:temp[1], name: temp[0],
               size: stat.size, uploadedOn: stat.atime};
            results.push(item);
         }
         deferred.resolve(results);
      });
      return deferred.promise;
   };



   exports.upload = function(req, res){
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

   exports.delete = function(req, res){

   };

   exports.get = function(req, res){
      _getFiles().then(function(files){
         res.send(files);
      })
   };

})(module.exports);