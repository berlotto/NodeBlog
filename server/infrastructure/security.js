

var authenticate = function (user, pass) {
    //console.log('user : ' + user);
    //console.log('password : ' + pass);
    return user === pass;
};

var authorize = function (user, pass, role) {

    return user === pass;
};


module.exports.authenticate = authenticate;
module.exports.authorize = authorize;