/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
    module.directive('jjHeader', ['$window', function($window) {

        return {
            restrict: 'E',
            replace: true, // The element containing the directive will be replaced with the template
            templateUrl: '/app/js/directives/templates/header.html',
            controller: 'HeaderCtrl'
        };
    }]);
})(window.DirectiveModule);
