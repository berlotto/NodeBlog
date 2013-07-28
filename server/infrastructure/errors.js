/**
 * Created with JetBrains WebStorm.
 * User: jeffjin
 * Date: 7/28/13
 * Time: 1:20 AM
 * To change this template use File | Settings | File Templates.
 */
var notification = require('./notification'),
    fs = require('fs'),
    path = require('path');


var Error404 = function (msg){
    this.name = 'NotFound';
    Error.call(this, msg);//call Error constructor
    Error.captureStackTrace(this, arguments.callee);
}

var serverError = function(req, res){
    fs.readFile(path.join(__dirname, '../views', '500.html'),
        function(err, data){
            res.writeHead(500);
            if (err) {
                res.end('500 Server Error');
            }
            res.end(data);
        });
};

var notFound = function (req, res){
    fs.readFile(path.join(__dirname, '../views', '404.html'),
        function(err, data){
            res.writeHead(404);
            if (err) {
                res.end('404 Not Found');
            }
            res.end(data);
        });
};

var errorHandler = function (err, req, res, next) {
    notification.sendEmail(err);
    if (err instanceof Error404) {
        notFound(req, res);
    }
    else {
        serverError(req, res);
    }
};


module.exports.serverError = serverError;
module.exports.notFound = notFound;
module.exports.errorHandler = errorHandler;
