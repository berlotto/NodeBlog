/**
 * Created with JetBrains WebStorm.
 * User: jeff jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var q = require('q'),
        dac = require('../repository/user-dac.js');

    var validate =function(userName, password){
        var deferred = q.defer();
        var userPromise = dac.findByEmail(userName);
        userPromise.then(function(user){
            if(user.password === password){//TODO MD5 hash check
                deferred.resolve(user);
            }
            else{
                deferred.reject("Invalid password");
            }
        }, function(reason){
            deferred.reject(reason);
        });
        return deferred.promise;
    };


    var findByEmail = function(email){
        return dac.findByEmail(email);
    };

    exports.validate = validate;
    exports.findByEmail = findByEmail;
})();


