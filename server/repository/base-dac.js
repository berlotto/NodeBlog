/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */
(function(exports){
   var MongoClient = require('mongodb').MongoClient
      , format = require('util').format
      , q = require('q');

   var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
   var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017;
   var database = null;
   var _init = function(){
      var deferred = q.defer();
      if(database){
         console.log('Resolving Existing MongoClient...');
         deferred.resolve(database);
      }
      else{
         console.log('Initializing MongoClient...');
         MongoClient.connect(format("mongodb://%s:%s/blogs?w=1", host, port), function(err, db) {
            database = db;
            deferred.resolve(db);
         });
      }
      return deferred.promise;
   };

   /*********************End of Private functions*************************/
   console.log("Connecting to " + host + ":" + port);

   exports.init = _init;

})(module.exports);
