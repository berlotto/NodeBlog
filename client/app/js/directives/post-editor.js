'use strict';

/* Directives */


(function(module){
  module.directive('wmdEditor', ['$window', function($window) {
    var initialize = function(scope){
      console.log('Initializing wmdEditor directive ...');
      scope.states = [];
    };

    var setupEvents = function(scope){
      console.log('setting up events ...');

      scope.markdown = function(content){
        //processing content
        //console.log('processing content ' + content);
        return content;
      };
      scope.getSelection = function(){

      };
      scope.bold = function(){
        console.log('bold selection ...');
      };
      scope.italic = function(){
        console.log('italic selection ...');
      };
      scope.hyperlink = function(){

      };
      scope.blockQuote = function(){

      };
      scope.image = function(){

      };
      scope.codify = function(){

      };
      scope.numberedList = function(){

      };
      scope.bulletedList = function(){

      };
      scope.heading = function(){

      };
      scope.hRule = function(){

      };
      scope.redo = function(){

      };
      scope.undo = function(){

      };
    };
    return {
      restrict: 'EA',
      //transclude: true, // It transcludes(transfer includes) the contents of the directive into the template
      replace: true, // The element containing the directive will be replaced with the template
      templateUrl: './js/directives/templates/post-editor-template.html',
      scope: {// Create an isolated scope and interpolate the entry attribute onto this scope
        content: '=',
        preview: '='
      },
      link: function (scope, element, attrs) {
        initialize(scope);
        setupEvents(scope);
      }
    };
  }]);
})(window.DirectiveModule);