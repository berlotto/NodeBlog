var log = function(msg) {
    console.log(msg);
}

var sendEmail = function(msg){
    console.log('sending email :: ' + msg);
};

var sendSms = function(msg){
    console.log('sending sms :: ' + msg);
};

module.exports.sendEmail = sendEmail;
module.exports.sendSms = sendSms;
module.exports.log = log;