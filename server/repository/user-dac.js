/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){
  var MongoClient = require('mongodb').MongoClient,
     format = require('util').format,
     baseDac = require('./base-dac'),
     q = require('q');

  var _init = baseDac.init;

/*********************Private functions*************************/
  var _findAll = function(options){
    var deferred = q.defer();

    var users = [];//Initialize default users from config file
    users.push({email:'jeff@jeffjin.com', name:'Jeff Jin', password:'1111'});
    users.push({email:'jeff@jeffjin.net', name:'Jeff Kim', password:'1111'});
    users.push({email:'jeff@nodeblog.ca', name:'Jeff Z', password:'1111'});

    var getUsers = function(coll, callback){
      coll.find().each(function(err, item) {
        if(item != null) {
          users.push(item);
        }
        else{//end of the query
          if(callback){
            callback(users);
          }
        }
      })
    };

    _init().then(function(db){
      var collection = db.collection('users');
      collection.count({}, function(err, count) {
        if(err){
          deferred.reject(err);
        }
        if(count === 0){
          collection.insert(users, {safe: true}, function(err, records){
            console.log(records.length + " records are inserted into the users collection.");
            getUsers(collection, function(list){
              deferred.resolve(list);
            });
          });
        }
        else{
          getUsers(collection, function(list){
            deferred.resolve(list);
          });
        }
      });
    });
    return deferred.promise;
  };

  var _findByEmail = function(email) {
    console.log('searching for ' + email);
    var deferred = q.defer();
    _init().then(function(db){
      var collection = db.collection('users');
      collection.findOne({email: email}, function(err, item) {
        if(err || !item) {
          deferred.reject(item);
        }
        console.log('user with email "' + email + '" has been found successfully!');
        deferred.resolve(item);
      });
    });
    return deferred.promise;
  };

  var _update = function(id, user) {
    var deferred = q.defer();
    _init().then(function(db){
      var collection = db.collection('users');
      collection.update(
        {id: id},
        { $set:
          {
            'name': user.name,
            'email': user.email,
            'password': user.password//TODO: Need to encrypt with MD5
          }
        },
        function(err, result){
          if(err || !result) {
            deferred.reject(err);
          }
          console.log(user.name + " is updated in the users collection.");
          deferred.resolve(result);
        }
      );
    });
    return deferred.promise;
  };
  var _delete = function(id) {

  };
  var _create = function(user) {
    var deferred = q.defer();
    _init().then(function(db){
      var collection = db.collection('users');
      collection.insert(user, {safe: true}, function(err, result){
        if(err || !result) {
          deferred.reject(err);
        }
        deferred.resolve(result);
      });
    });
    return deferred.promise;
  };
/*********************End of Private functions*************************/
    module.exports.findAll = _findAll;
    module.exports.findByEmail = _findByEmail;
    module.exports.update = _update;
    module.exports.delete = _delete;
    module.exports.create = _create;
})();
