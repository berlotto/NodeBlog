var fs = require('fs'),
    path = require('path'),
    data = require('../repository/data'),
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
        mapResource(req, res, fs, '../../client', 'index.html');
    });

    server.get('/admin', function(req,res){
        mapResource(req, res, fs, '../../private', 'admin.html');
    });

    server.get('/cookie', function(req,res){
        console.log(req.sessionID);
        req.session.name = req.session.name || new Date().toUTCString();
        res.send(req.session.name);
    });

//    server.get('/apps/:name', function(req,res){
//        var name = req.params.name;
//        mapResource(req, res, fs, '../client/apps', name);
//    });


    /////// RESTFUL API ROUTING  /////////
    //TODO implement findALl and patch/update
    server.get('/blogs', data.games.findAlbl);
    server.get('/games/:id', data.games.find);
    server.put('/games/:id', data.games.update);
    server.patch('/games/:id', data.games.patch);
    server.delete('/games/:id', data.games.delete);
    server.post('/games', data.games.create);

    server.get('/stats', data.stats.findAll);
    server.get('/stats/:id', data.stats.find);
    server.put('/stats/:id', data.stats.update);
    server.delete('/stats/:id', data.stats.delete);
    server.post('/stat', data.stats.create);

    /////// ERROR ROUTING  /////////
    //A Route for Creating a 500 Error (Useful to keep around)
    server.get('/500',errors.serverError );

    //The 404 Route (ALWAYS Keep this as the last route)
    server.get('/*',errors.notFound);
};

exports.setupRoutes = setupRoutes;