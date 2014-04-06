/**
 * Created with JetBrains WebStorm.
 * User: jeff jin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

(function(exports){
    var q = require('q'),
        dac = require('../repository/user-dac.js');

    var validate =function(userName, password){
        var deferred = q.defer();
        dac.findByEmail(userName).then(function(user){
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

    var updateUser = function(id, user){
        return dac.update(id, user);
    };

    var findByEmail = function(email){
        return dac.findByEmail(email);
    };

    exports.validate = validate;
    exports.findByEmail = findByEmail;
    exports.update = updateUser;

})(module.exports);


