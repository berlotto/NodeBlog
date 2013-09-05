'use strict';

/* Directives */


(function(module){
  module.directive('wmdEditor', ['$window', function($window) {
    var initialize = function(scope){
      console.log('Initializing wmdEditor directive ...');
      scope.states = [];
    };
    var getSelection = function(elm)
    {
      var selectedText;
      // IE version
      if (document.selection !== undefined)
      {
        elm.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
      }
      // Mozilla version
      else if (elm.selectionStart != undefined)
      {
        var startPos = elm.selectionStart;
        var endPos = elm.selectionEnd;
        selectedText = elm.value.substring(startPos, endPos)
      }
      console.log("You selected: " + selectedText);
      return selectedText;
    }
    var setupEvents = function(scope, elm){
      console.log('setting up events ...');

      scope.markdown = function(content){
        //processing content
        //console.log('processing content ' + content);
        return content;
      };

      scope.bold = function(){
        console.log('bold selection ...');
        getSelection(elm);
      };
      scope.italic = function(){
        console.log('italic selection ...');
        getSelection(elm);
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
        preview: '=',
        bold: '&',
        italic: '&',
        hyperlink: '&',
        blockQuote: '&',
        image: '&',
        codify: '&',
        numberedList: '&',
        bulletedList: '&',
        heading: '&',
        hRule: '&',
        redo: '&',
        undo: '&'
      },
      link: function (scope, element, attrs) {
        initialize(scope);
        setupEvents(scope, $('#wmd-input', element)[0]);
      }
    };
  }]);
})(window.DirectiveModule);