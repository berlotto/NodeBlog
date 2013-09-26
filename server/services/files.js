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

  module.exports.upload = function(req, res){
    console.log(JSON.stringify(req.files.uploadFile.path));
    fs.readFile(req.files.uploadFile.path, function (err, data) {
      console.log('__dirname = ' + __dirname);

      var newPath = path.join(__dirname, '../uploads/' + req.files.uploadFile.filename);
      console.log('newPath = ' + newPath);
      fs.writeFile(newPath, data, function (err) {
        //res.redirect("back");
        res.send(200);
      });
    });
  };
  module.exports.delete = function(req, res){

  };
  module.exports.get = function(req, res){

  };

})();