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
        console.log('Passport serializing user ' + JSON.stringify(user));
        done(null, user.email);
    });

    _passport.deserializeUser(function(email, done) {
        console.log('Passport deserializing user ' + email);
        users.findByEmail(email).then(function (user) {
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
        res.send(403);
    }
};

// Check for admin middleware, this is unrelated to passport.js
// You can delete this if you use different method to check for admins or don't need admins
var ensureAdmin = function(req, res, next) {
    if(req.user && req.user.admin === true)
        next();
    else
        res.send(403);
};

var validate = function(uname, pwd) {
    console.log('security.js validating ' + uname);
    return users.validate(uname, pwd);
};

var authenticate = function(req, res, next) {
    if(!_passport){
        console.warn('passport is not initialized.');
        return;
    }
    _passport.authenticate('local', function(err, user, info) {
        console.log('passport start authenticating ' + user + ', info = ' + info);
        if (err) { return next(err) }
        if (!user) {
            return res.redirect('/#/login')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(200);
        });
    })(req, res, next);
};

module.exports.init = init;
module.exports.authenticate = authenticate;
module.exports.validate = validate;
module.exports.ensureAdmin = ensureAdmin;
module.exports.ensureAuthenticated = ensureAuthenticated;