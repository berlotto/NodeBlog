/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/28/13
 * Time: 1:20 AM
 * To change this template use File | Settings | File Templates.
 */
//Global function configuration


var init = function (){
    //1) setup string endsWith
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }


};

module.exports.init = init;
