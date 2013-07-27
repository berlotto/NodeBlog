/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/27/13
 * Time: 12:59 AM
 * To change this template use File | Settings | File Templates.
 */

exports.list = function(req, res){
    var size = req.params.size;

    res.send("respond with a list of blogs");
};
