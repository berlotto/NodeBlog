/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: root
 * Date: 3/30/13
 * Time: 1:23 AM
 * To change this template use File | Settings | File Templates.
 */
(function(exports){
  var dac = require('../repository/blog-dac.js')
    , _ = require('lodash/dist/lodash.underscore');


  /*********************End of Private functions*************************/

    exports.findAll = function(req, res) {
       console.log('findAll...');

       dac.findAll(null).then(function(result){
        //console.log(result);
        res.send(result);
      });
    };
    exports.find = function(req, res){
      dac.findById(req.params.id).then(function(result){
        _.forEach(result.comments, function(item){
          console.log(item.authorName + ' commented at ' + item.createdOn);
        });
        res.send(result);
      });
    };
    exports.update = function(req, res){
        dac.update(req.params.id, req.body);
        res.send(200);
    };
    exports.delete = function(req, res) {
        dac.delete(req.id);
        res.send(200) ;
    };
    exports.patch = function(req, res) {
        dac.update(req.params.id, req.body);
        res.send(200);
    };
    //http post create new resource
    exports.create = function(req, res){
        console.log('creating new post...');
        var id = dac.create(req.body);
        console.log('New id is '+ id);
        res.send({'id':id});
    };

})(module.exports);
