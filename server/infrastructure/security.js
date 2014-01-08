var LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , users = require('../services/users.js');


///////////////////////////////////////////
//         Security With Passport        //
///////////////////////////////////////////
var _passport = null;
var init = function (passport, config) {
    console.log('Initialize passport authentication...');
    _passport = passport;

    _passport.serializeUser(function(user, done) {
        console.log('Passport serializing user ' + user.email);
        done(null, user.email);
    });

    _passport.deserializeUser(function(id, done) {
        console.log('Passport deserializing user ' + id);
        users.findByEmail(id).then(function (user) {
            console.log('user service found a user with ' + id);
            done(null, user);
        }, function(err){
            done(err, null);
        });
    });

    _passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('validating ' + username);
            users.validate(username, password).then(function(user) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
                return done(null, user);
            }, function(error){
                return done(error);
            });
        }
    ));
//    passport.use(new FacebookStrategy({
//            clientID: config.facebook.clientID,
//            clientSecret: config.facebook.clientSecret,
//            callbackURL: config.facebook.callbackURL
//        },
//        function(accessToken, refreshToken, profile, done) {
//            //users.findOrCreateFaceBookUser(profile, done);
//        }));
    return _passport;
};
// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
var ensureAuthenticated = function(req, res, next) {
    console.log('check authentication for user ' + JSON.stringify(req.user));

    if (req.isAuthenticated()) {
        console.log('the current session is logged in and validated')
        return next();
    }
    else{
        res.send(403);//serve login page
    }
};

// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
var ensureAdmin = function(req, res, next) {
    if(req.user && req.user.admin === true)
        next();
    else
        res.send(401);//serve page not found
};

var validate = function(uname, pwd) {
    console.log('security.js validating ' + uname);
    return users.validate(uname, pwd);
};

var authenticate = function(req, res, next) {
    if(!_passport){
        console.warn('passport is not initialized.');
        return res.send(500);
    }
    _passport.authenticate('local', function(err, user, info) {
        console.log('passport start authenticating ' + user.email);
        if (err && next) { return next(err) }
        if (!user) {
            //return res.redirect('/#/login');//not valid in SPA context
            return res.send(401);
        }
        req.logIn(user, function(err) {
            if (err && next) { return next(err); }
            return res.send(user);
        });
    })(req, res, next);
};

module.exports.init = init;
module.exports.authenticate = authenticate;
module.exports.validate = validate;
module.exports.ensureAdmin = ensureAdmin;
module.exports.ensureAuthenticated = ensureAuthenticated;