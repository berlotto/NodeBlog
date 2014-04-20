/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
    module.directive('jjHeader', ['$window', function($window) {

        return {
            restrict: 'AE',
            replace: true,
            <!--For unit testing-->
            //template: '<header><div>The Law of the Jungle</div><h2>{{headerText}}</h2></header>',
            templateUrl: '/app/js/directives/templates/header.html',
            controller: 'HeaderCtrl'
        };
    }]);
})(window.DirectiveModule);
