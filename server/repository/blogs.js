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
  var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    , q = require('q');

  var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
  var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017;
  var database = null;
  var _init = function(callback){
    MongoClient.connect(format("mongodb://%s:%s/blogs?w=1", host, port), function(err, db) {
      database = db;
      if(callback){
        callback(db);
      }
    });
  };
/*********************Private functions*************************/
  var _findAll = function(options){
    var deferred = q.defer();

    var posts = [];//sample test data
    posts.push({
      year: 2012,
      month: 'July',
      day: 12,
      topic: 'Singleton with JavaScript',
      urlLink: 'posts/javascript-singleton',
      summary: 'Singleton is one of the most widely used design patterns in any programming languages.',
      comments: []
    });
    posts.push({
      year: 2012,
      month: 'June',
      day: 12,
      topic: 'Aspect Oriented Programming with JavaScript',
      urlLink: 'posts/aop-with-javascript',
      summary: 'Aspect Oriented Programming has always been an interesting topic for me. With JavaScript it is not that obvious.',
      comments: [{},{}]
    });
    posts.push({
      year: 2011,
      month: 'July',
      day: 11,
      topic: 'Javascript Pitfalls',
      urlLink: 'posts/javascript-pitfalls',
      summary: 'A list of potential areas where .net or Java developers easily make mistakes in Javascript programming.',
      comments: [{},{},{}]
    });
    posts.push({
      year: 2013,
      month: 'July',
      day: 12,
      topic: 'Will JavaScript be universal?',
      urlLink: 'posts/javascript-universal',
      summary: 'With JavasSript based apps are getting more and more popular, will it become universal programming language?',
      comments: [{}]
    });
    var postRecords = [];
    console.log("Connecting to " + host + ":" + port);

    var getPosts = function(coll, callback){
      coll.find().each(function(err, item) {
        if(item != null) {
          //console.dir(item);
          //console.log("created at " + new Date(item._id.generationTime) + "\n");
          postRecords.push(item);
        }
        else{//end of the query
          if(callback){
            callback(postRecords);
          }
        }
      })
    };
    var setupPostsAndFind = function(){
      var collection = database.collection('posts');
      collection.count({}, function(err, count) {
        if(err){
          deferred.reject(err);
        }
        if(count === 0){
          collection.insert(posts, {safe: true}, function(err, records){
            console.log(records.length + " records are inserted into the posts collection.");
            getPosts(collection, function(list){
              deferred.resolve(list);
            });
          });
        }
        else{
          getPosts(collection, function(list){
            deferred.resolve(list);
          });
        }
      });
    };
    if(!database){
      _init(function(db){
        setupPostsAndFind();
      })
    }
    else{
      setupPostsAndFind();
    }
    return deferred.promise;
  };
/*********************End of Private functions*************************/
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
      _findAll(null).then(function(result){
        //console.log(result);
        res.send(result);
      });
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
