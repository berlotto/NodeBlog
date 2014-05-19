'use strict';

/* Services */

//store logged in user identity information
(function(exports, module){
   module.value('identity', {currentUser: {}});

   module.value('FloorPlan', FloorPlan);

   module.value('gmaps', exports.google.maps);

   module.value('amplify', amplify);

   module.value('marked', marked);

   module.value('moment', moment);

   module.value('md5', hex_md5);

   module.value('jsPlumb', jsPlumb);

   module.value('locale', 'en');

   module.constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      logoutFailed: 'auth-logout-failed',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
   });

   module.constant('USER_ROLES', {
      all: '*',
      admin: 'admin',
      editor: 'editor',
      guest: 'guest'
   });

})(window, window.ServiceModule);