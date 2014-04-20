/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
   module.directive('jjLoginForm', ['$window', function ($window) {
      return {
         restrict: 'EA',
         replace: true,
         transclude: false,
         templateUrl: 'scripts/directives/templates/login-form.html',
         controller: 'LoginFormCtrl',
         link: function(scope, element, attrs){

         }
      };
   }]);
})(window.DirectiveModule);
