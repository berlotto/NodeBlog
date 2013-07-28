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
//    var mongo = require('mongodb'),
//        q = require('q'),
//        client = mongo.createClient();
//
//    var _findById = function(gameId) {
//        var deferred = q.defer();
//        client.get(gameId, function (err, reply) {
//            if(err)
//            {
//                console.log('error: ' + err);
//                deferred.reject(err);
//            }
//            else{
//                console.log('success: ' + reply);
//                var temp;
//                try{
//                    temp = JSON.parse(reply);
//                    deferred.resolve(temp);
//                }
//                catch(ex){
//                    deferred.resolve(reply);
//                }
//            }
//        });
//        return deferred.promise;
//    };
//
//    var _create = function(settings) {
//        if((typeof settings) == 'object'){
//            settings = JSON.stringify(settings);
//        }
//        var id = _generateId();
//        //calculate new id and return
//        client.set(id, settings);
//        return id;
//    };
//    var _patch = function(id, updateFields) {
//        var p = _findById(id).then(function(data){
//            for(var key in updateFields){
//                console.log(key, updateFields.hasOwnProperty(key), data.hasOwnProperty(key));
//                if(updateFields.hasOwnProperty(key)
//                    && data.hasOwnProperty(key)){
//                    data[key] = updateFields[key];
//                }
//            }
//            _update(id, data);
//        }, function(err){
//        });
//
//        return p;
//    };
//
//    var _delete = function(gameId) {
//        client.del(gameId);
//    };
//    //TODO: need to implement the logic
//    var _generateId = function() {
//        var newId = new Date().getTime();
//        console.log('Generated new id is '+ newId);
//        return newId;
//    };
//
//    var _update = function(id, settings) {
//        if((typeof settings) == 'object'){
//            settings = JSON.stringify(settings);
//        }
//        client.set(id, settings);
//    };

    module.exports.findAll = function(req, res) {
//        client.keys('*', function (err, keys) {
//            var temp = [],
//                results = [];
//            if (err) {
//                console.log(err);
//                return;
//            }
//
//            for(var i = 0, len = keys.length; i < len; i++) {
//                console.log(keys[i]);
//                var p = _findById(keys[i]).then(function(data){
//                    console.log(keys[i], data);
//                    results.push(data);
//                });
//                temp.push(p);
//            }
//            q.all(temp).then(function(){
//                res.send(results);
//            });
//        });
        res.send('find all blogs');
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
//        console.log('creating new settings...');
//        var id = _create(req.body);
//        console.log('New id is '+ id);
//        res.send({'id':id});
    };

})();
