/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var dac = require('../repository/user-dac.js');

    var validate =function(userName, password, callback){
        var deferred = q.defer();
        var userPromise = dac.findByEmail(userName);
        userPromise.then(function(user){
            if(user.password === password){//TODO MD5 hash
                if(callback){
                    callback(null, user);
                }
                deferred.resolve(user);
            }
            else{
                if(callback){
                    callback("Invalid password", null);
                }
                deferred.reject("Invalid password");
            }
        }, function(reason){
            if(callback){
                callback(reason, null);
            }
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    exports.validate = validate;
})();


