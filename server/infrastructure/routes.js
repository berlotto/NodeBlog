var fs = require('fs'),
    path = require('path'),
    blogs = require('../repository/blogs.js'),
    comments = require('../repository/comments.js'),
    files = require('../repository/files.js'),
    users = require('../repository/users.js'),
    errors = require('./errors');

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

//param: server is expressJs instance
var setupRoutes = function(server)
{
    var mapResource = function(req, res, fs, folder, file){
        var p = path.join(__dirname, folder, file);
        fs.readFile(p, function(err, data){
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + file);
            }
            res.writeHead(200);
            res.end(data);
        });
    };

    /////// PAGE ROUTING  /////////
    server.get('/', function(req,res){
        mapResource(req, res, fs, '../../client/app', 'index.html');
    });

    server.get('/admin', function(req,res){
        mapResource(req, res, fs, '../../client/app', 'admin.html');
    });

    server.get('/cookie', function(req,res){
        console.log(req.sessionID);
        req.session.name = req.session.name || new Date().toUTCString();
        res.send(req.session.name);
    });

    /////// RESTFUL API ROUTING  /////////
    //TODO implement findALl and patch/update
    server.get('/posts', blogs.findAll);
    server.get('/posts/:id', blogs.find);
    server.put('/posts/:id', blogs.update);
    server.patch('/posts/:id', blogs.patch);
    server.delete('/posts/:id', blogs.delete);
    server.post('/posts', blogs.create);

    server.get('/comments', comments.findAll);
    server.get('/comments/:id', comments.find);
    server.put('/comments/:id', comments.update);
    server.delete('/comments/:id', comments.delete);
    server.post('/comments', comments.create);

    /////// ERROR ROUTING  /////////
    //A Route for Creating a 500 Error (Useful to keep around)
    server.get('/500',errors.serverError );

    //The 404 Route (ALWAYS Keep this as the last route)
    //server.get('/*',errors.notFound);
};

exports.setupRoutes = setupRoutes;