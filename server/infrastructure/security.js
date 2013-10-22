var LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , users = require('../services/users.js');


///////////////////////////////////////////
//         Security With Passport        //
///////////////////////////////////////////

var init = function (passport, config) {
    console.log('Initialize passport authentication...')
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        users.findByEmail(email).then(function (err, user) {
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
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            //users.findOrCreateFaceBookUser(profile, done);
        }));
    };
// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
var ensureAuthenticated = function(req, res, next) {
    console.log('check authentication...')
    if (req.isAuthenticated()) { return next(); }
    res.send(403);
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
    return users.validate(uname, pwd);
};

module.exports.init = init;
module.exports.validate = validate;
module.exports.ensureAdmin = ensureAdmin;
module.exports.ensureAuthenticated = ensureAuthenticated;