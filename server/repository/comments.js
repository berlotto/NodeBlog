/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){

  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    , marked = require('marked')
    , io = require('socket.io')
    , q = require('q');


    module.exports.findAll = function(req, res){
//        _findById(req.params.id).then(function(result){
//            res.send(result);
//        });
    };
    module.exports.find = function(req, res){
//        _findById(req.params.id).then(function(result){
//            res.send(result);
//        });
    };
    module.exports.update = function(req, res){
//        _update(req.params.id, req.body);
//        res.send(200);
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
      console.log('inserting new comment...');
        var comment = JSON.parse(req.body);
        //save into mongodb

        //broadcast this event to all clients with socket IO
    };

})();
