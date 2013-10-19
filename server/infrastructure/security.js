var LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , users = require('../services/users.js');


///////////////////////////////////////////
//         Security With Passport        //
///////////////////////////////////////////

var init = function (passport, config) {
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

module.exports.init = init;