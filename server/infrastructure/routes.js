(function(exports){

   var fs = require('fs'),
      path = require('path'),
      blogs = require('../services/blog-svc.js'),
      comments = require('../services/comment-svc.js'),
      files = require('../services/file-svc.js'),
      images = require('../services/image-svc.js'),
      security = require('./security.js'),
      im = require('imagemagick'),
      errors = require('./errors');

///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

//param: server is expressJs instance
   var setupRoutes = function(server, env)
   {
      var mapResource = function(req, res, fs, folder, file){
         var p = path.join(__dirname, folder, file);

         if(file.endsWith('.js')){
            console.log('sending javascript file: ' + file);
            res.set('Content-Type', 'text/javascript');
            res.sendfile(p);
         }
         else if(file.endsWith('.html')){
            console.log('sending html file: ' + file);
            res.set('Content-Type', 'text/html');
            res.sendfile(p);
         }
         else{
            fs.readFile(p, function(err, data){
               if (err) {
                  res.writeHead(500);
                  return res.end('Error loading ' + file);
               }
               res.writeHead(200);
               res.end(data);
            });
         }
      };

      /////// PAGE ROUTING  /////////

//  // set up our security to be enforced on all requests to secure paths
//  server.get('/admin/:dir/:file',  function(req, res){
//      security.ensureAuthenticated(req, res, function(){
//          mapResource(req, res, fs, '../../client/' + req.params.dir, req.params.file);
//      });
//  });

      server.post('/api/authenticate',  function(req, res, next){
         console.log('authenticate => ' + JSON.stringify(req.body));
         security.authenticate(req, res, next);
      });

      server.get('/api/loggedIn', function(req, res) { res.send(req.isAuthenticated() ? req.user : null); });

      server.post('/api/logout', function(req, res){ req.logOut(); res.send(200); });

      server.post('/api/postmarkInbound', function(req, res){
         console.log('postmarkInbound => ' + JSON.stringify(req.body));
         res.send(req.body);
      });

      server.post('/api/postmarkBounce', function(req, res){
         console.log('postmarkBounce => ' + req.body);
         res.send(req.body);
      });

      server.get('/api/cookie', function(req,res){
         console.log(req.sessionID);
         req.session.name = req.session.name || new Date().toUTCString();
         res.send(req.session.name);
      });

      /////// PASSPORT SECURITY CHECK ///////
      // route to test if the user is logged in or not
      // server.get('/loggedIn', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });
      // route to log in
      // server.post('/login', security.authenticate('local'), function(req, res) { res.send(req.user); });
      // route to log out

      //////////////////////////////////////
      //////////RESTful Web Api//////////////
      /////////////////////////////////////
      server.get('/api/posts', blogs.findAll);
      server.get('/api/posts/:id', blogs.find);
      server.put('/api/posts/:id', blogs.update);
      server.patch('/api/posts/:id', blogs.patch);
      server.delete('/api/posts/:id', blogs.delete);
      server.post('/api/posts', blogs.create);
      server.post('/api/tests', function(req, res){
         console.log('posting post...', req.body);
         res.send({'msg': 'posting ' + req.body});
      });
      server.delete('/api/tests/:id', function(req, res){
         console.log('deleting post...', req.params.id);
         res.send({'msg': 'deleting ' + req.params.id});
      });
      server.put('/api/tests/:id', function(req, res){
         console.log('updating post...', req.params.id);
         res.send({'msg': 'updating ' + req.params.id});
      });

      server.get('/api/comments/:id', comments.find);
      server.put('/api/comments/:id', comments.update);
      server.delete('/api/comments/:id', comments.delete);
      server.post('/api/comments', comments.create);

      server.get('/api/files', files.get);
      server.post('/api/files', files.upload);
      server.delete('/api/files/:id', files.delete);

      server.get('/api/image-folders/:imageWidth', images.getImageFolders);
      server.get('/api/images/:name/:folders/:date', images.getImagesByDate);
      server.get('/api/images/:name/:folders/:index/:size', images.getImages);
      /////// ERROR ROUTING  /////////
      //A Route for Creating a 500 Error (Useful to keep around)
      server.get('/500',errors.serverError );

      //The 404 Route
      server.get('/400',errors.notFound);

//  // (ALWAYS Keep this as the last route)
//  server.get(/^\/(.*)/, function (req, res) {
//      //everything else
//      mapResource(req, res, fs, '../../client', 'index.html');
//  });
   };

   var setupSockets = function (socket){
      comments.initSocket(socket);
      //blogs.initSocket(s);
   } ;

   exports.setupRoutes = setupRoutes;
   exports.setupSockets = setupSockets;


})(module.exports);