'use strict';

/* Directives */


(function(module){
  module.directive('wmdEditor', ['$window', function($window) {

    return {
      restrict: 'EA',
      replace: true, // The element containing the directive will be replaced with the template
      templateUrl: './js/directives/templates/markdown-editor.html',
      scope: {
      },
      link: function (scope, element, attrs) {

      }
    };
  }]);
})(window.DirectiveModule);