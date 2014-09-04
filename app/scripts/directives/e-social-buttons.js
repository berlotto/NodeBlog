/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
   module.directive('eSocialButtons', [function () {


      return {
         restrict: 'AE',
         replace: true,
         scope: {
         },
         templateUrl: 'views/templates/social-buttons.html',
         link: function ($scope, element, attrs) {

         }
      };
   }]);
})(window.DirectiveModule);
