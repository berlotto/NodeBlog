/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){

  var blogDac = require('../repository/blog-dac.js')
    , commentDac = require('../repository/comment-dac.js')
    , marked = require('marked')
    , q = require('q');

    var socket = null;

    module.exports.initSocket = function(s){
       socket = s;
    };

    module.exports.find = function(req, res){
        commentDac.findById(req.params.id).then(function(result){
            res.send(result);
        });
    };
    module.exports.update = function(req, res){
        commentDac.update(req.params.id, req.body).then(function(){
            res.send(200);
        });
    };
    module.exports.delete = function(req, res) {
//        _delete(req.id);
//        res.send(200) ;
    };
    module.exports.patch = function(req, res) {
//        _patch(req.params.id, req.body);
//        res.send(200);
    };
//http post create new resource
    module.exports.create = function(req, res){
      console.log('inserting new comment...' + JSON.stringify(req.body));
      var postId = req.body.postId;
      var comment = req.body.comment;
      //save into mongodb
      blogDac.addComment(postId, comment).then(function(result){
          //broadcast this event to all clients with socket IO
          console.log("broadcasting ...  => comments-inserted-" + postId);
          socket.broadcast.emit("comments-inserted-" + postId, comment);
      }).then(function(){
          res.send(200);
        });
    };

})();
