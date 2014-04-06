/**
 * Created with JetBrains WebStorm.
 * User: Jeff Jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */
(function(exports){
   var baseDac = require('./base-dac')
      , q = require('q');

   var _init = baseDac.init;

   /*********************Private functions*************************/

   var _findById = function(id) {
      var deferred = q.defer();
      _init().then(function(db){
         var collection = db.collection('comments');
         collection.findOne({_id: id}, function(err, item) {
            if(err || !item) {
               deferred.reject(item);
            }
            console.log(id + ' has been found successfully!');
            deferred.resolve(item);
         });
      });
      return deferred.promise;
   };

   var _update = function(id, cmt) {
      var deferred = q.defer();
      _init().then(function(db){
         var collection = db.collection('comments');
         collection.update(
            {_id: id},
            { $set:
            {
               'authorName': cmt.authorName,
               'authorEmail': cmt.authorEmail,
               'body': cmt.body,
               'createdOn': cmt.createdOn,
               'updatedOn': cmt.updatedOn
            }
            },
            function(err, result){
               if(err || !result) {
                  deferred.reject(err);
               }
               else{
                  deferred.resolve(result);
               }
            }
         );
      });
      return deferred.promise;
   };

   var _delete = function(id) {

   };

   var _create = function(cmt) {
      var deferred = q.defer();
      _init().then(function(db){
         var collection = db.collection('comments');
         collection.insert(cmt, {safe: true}, function(err, result){
            if(err || !result) {
               deferred.reject(err);
            }
            deferred.resolve(result);
         });
      });
      return deferred.promise;
   };

   var _findByPostId = function(postId) {
      var deferred = q.defer();
      _init().then(function(db){
         var comments = db.collection('comments');
         comments.find({postId: postId},
            function(err, result){
               if(err || !result) {
                  deferred.reject(err);
               }
               deferred.resolve(result);
            }
         );
      });
      return deferred.promise;
   };

   /*********************End of Private functions*************************/

   exports.findById = _findById;
   exports.findByPostId = _findByPostId;
   exports.update = _update;
   exports.delete = _delete;
   exports.create = _create;
})(module.exports);
