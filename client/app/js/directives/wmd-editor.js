'use strict';

/* Directives */


(function(module){
  module.directive('wmdEditor', ['$window', function($window) {
    var initialize = function(){
      console.log('Initializing wmdEditor directive ...');
    };
    return {
      restrict: 'EA',
      //transclude: true, // It transcludes(transfer includes) the contents of the directive into the template
      replace: true, // The element containing the directive will be replaced with the template
      templateUrl: './js/directives/templates/wmd-template.html',
      scope: {// Create an isolated scope and interpolate the entry attribute onto this scope
        comment: '='
      },
      link: function (scope, element, attrs) {
        initialize();
        scope.markdown = function(content){
          //processing content
          //console.log('processing content ' + content);
           return content;
        };
      }
    };
  }]);
})(window.DirectiveModule);