(function(exports) {

   var log = function (msg) {
      console.log(msg);
   }

   var sendEmail = function (msg) {
      console.log('sending email :: ' + msg);
   };

   var sendSms = function (msg) {
      console.log('sending sms :: ' + msg);
   };

   exports.sendEmail = sendEmail;
   exports.sendSms = sendSms;
   exports.log = log;

})(module.exports);

