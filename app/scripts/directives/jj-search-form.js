/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
    module.directive('jjSearchForm', ['$window', function ($window) {
        return {
            restrict: 'E',
            replace: true, // The element containing the directive will be replaced with the template
            transclude: false,
            templateUrl: 'views/templates/search.html',
            controller: 'BlogSearchCtrl'
        };
    }]);
})(window.DirectiveModule);
