var fs = require('fs'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    path = require('path'),
    blogs = require('../services/blogs.js'),
    comments = require('../services/comments.js'),
    files = require('../services/files.js'),
    users = require('../services/users.js'),
    errors = require('./errors');



///////////////////////////////////////////
//         Security With Passport        //
///////////////////////////////////////////
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        users.validate(username, password, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        });
    }
));

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

  server.post('/postmarkinbound', function(req, res){
    console.log('postmarkinbound => ' + JSON.stringify(req.body));
    res.send(req.body);
  });

  server.post('/postmarkbounce', function(req, res){
      console.log('postmarkbounce => ' + req.body);
      res.send(req.body);
    });

  server.get('/cookie', function(req,res){
      console.log(req.sessionID);
      req.session.name = req.session.name || new Date().toUTCString();
      res.send(req.session.name);
  });


  //Passport module configuration
  server.get('/admin', passport.authenticate('local'));


    //////////////////////////////////////
  //////////RESTful Web Api//////////////
  /////////////////////////////////////
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

  server.get('/files', files.get);
  server.post('/files', files.upload);
  server.delete('/files/:id', files.delete);

  /////// ERROR ROUTING  /////////
  //A Route for Creating a 500 Error (Useful to keep around)
  server.get('/500',errors.serverError );

  //The 404 Route (ALWAYS Keep this as the last route)
  //server.get('/*',errors.notFound);
};

var setupSockets = function (s){
   comments.initSocket(s);
  //blogs.initSocket(s);
} ;

exports.setupRoutes = setupRoutes;
exports.setupSockets = setupSockets;