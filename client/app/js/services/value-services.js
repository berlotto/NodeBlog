'use strict';

/* Services */

//store logged in user identity information
(function(module){
    module.value('identity', {currentUser: {}});


    module.value('marked', marked);


    module.value('moment', moment);


    module.value('md5', hex_md5);


    module.value('locale', 'en');

})(window.ServiceModule);