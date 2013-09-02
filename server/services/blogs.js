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
(function(){
  var dac = require('../repository/blog-dac.js')
    , marked = require('marked')
    , _ = require('underscore');

  /*********************End of Private functions*************************/

    module.exports.findAll = function(req, res) {
      dac.findAll(null).then(function(result){
        console.log(result);
        res.send(result);
      });
    };
    module.exports.find = function(req, res){
      dac.findById(req.params.id).then(function(result){
        result.markedBody = marked(result.body);
        _.forEach(result.comments, function(item){
          item.markedBody = marked(item.body);
          console.log(item.authorName + ' commented at ' + item.createdOn);
        });
        res.send(result);
      });
    };
    module.exports.update = function(req, res){
        dac.update(req.params.id, req.body);
        res.send(200);
    };
    module.exports.delete = function(req, res) {
        dac.delete(req.id);
        res.send(200) ;
    };
    module.exports.patch = function(req, res) {
        dac.update(req.params.id, req.body);
        res.send(200);
    };
    //http post create new resource
    module.exports.create = function(req, res){
        console.log('creating new post...');
        var id = dac.create(req.body);
        console.log('New id is '+ id);
        res.send({'id':id});
    };

})();
