'use strict';

/* Directives */


(function(module){
  module.directive('wmdEditor', ['$window', function($window) {

    return {
      restrict: 'EA',
      transclude: true, // It transcludes(transfer includes) the contents of the directive into the template
      replace: true, // The element containing the directive will be replaced with the template
      templateUrl: 'templates/wmd-template.html',
      scope: {// Create an isolated scope and interpolate the entry attribute onto this scope
        comments: '='
      },
      link: function (scope, element, attrs) {

      }
    };
  }]);
})(window.DirectiveModule);