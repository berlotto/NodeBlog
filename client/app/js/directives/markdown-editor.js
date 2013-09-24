'use strict';

/* Directives */


(function(module){
  module.directive('markdownEditor', ['$window', function($window) {

    return {
      restrict: 'EA',
      replace: true, // The element containing the directive will be replaced with the template
      templateUrl: './js/directives/templates/markdown-editor.html',
      scope: {
        content: '='
      },
      link: function (scope, element, attrs) {
        var converter = Markdown.getSanitizingConverter();
        var editor = new Markdown.Editor(converter);
        editor.run();
      }
    };
  }]);
})(window.DirectiveModule);