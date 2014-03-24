/**
 * Created by jeffjin on 1/21/2014.
 * This directive will enable saving as work in progress and automatically load it back
 */
'use strict';

(function(module){
    module.directive('jjFooter', ['$window', function($window) {

        return {
            restrict: 'EA',
            replace: true, // The element containing the directive will be replaced with the template
            templateUrl: '/app/js/directives/templates/footer.html',
            link: function (scope, element, attrs) {

            }
        };
    }]);
})(window.DirectiveModule);
