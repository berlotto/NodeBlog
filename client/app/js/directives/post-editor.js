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

    var setSelectionRange = function(input, selectionStart, selectionEnd) {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
      }
      else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
      }
    }

    function setCursor (input, pos) {
      setSelectionRange(input, pos, pos);
    }

    var insertTextAtCursor = function(el, text) {
      var val = el.value, endIndex, range;
      if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
      } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
      }
    }

    var setTextAroundSelection = function(el, txtPre, txtPost) {
      var val = el.value, range, startPos, endPos,
        textBeforeSelection, textAfterSelection;
      if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
        startPos = el.selectionStart;
        endPos = el.selectionEnd;
        var selectedTxt = val.substring(startPos, endPos);
        //check if it is undo action
        var preTemp =   val.substring(startPos - txtPre.length, startPos);
        var postTemp =   val.substring(endPos, endPos + txtPost.length);
        if(preTemp === txtPre && postTemp === txtPost){
          //remove the previously applied markdowns
          textBeforeSelection = val.substr(0, startPos - txtPre.length);
          textAfterSelection = val.substr(endPos + txtPost.length);
          el.value = textBeforeSelection + selectedTxt + textAfterSelection;
          setSelectionRange(el, startPos - txtPre.length, endPos -  txtPost.length);
        }
        else{
          //append and prepend markdown symbols
          textBeforeSelection = val.substr(0, startPos);
          textAfterSelection = val.substr(endPos, val.length);
          el.value = textBeforeSelection + txtPre + selectedTxt + txtPost + textAfterSelection;
          setSelectionRange(el, startPos + txtPre.length, endPos + txtPost.length);
        }
      } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.collapse(false);
        var selectedTxt = range.text;
        range.text = txtPre + selectedTxt + txtPost;
        range.select();
      }
    }

    var setupEvents = function(scope, elm){
      console.log('setting up events ...');

      scope.bold = function(){
        console.log('make selection bold...');
        setTextAroundSelection(elm, '**', '**');
      };
      scope.italic = function(){
        console.log('make selection italic...');
        setTextAroundSelection(elm, '*', '*');
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

        scope.markdown = function(content){
          //processing content
          //console.log('processing content ' + content);
          return content;
        };
      }
    };
  }]);
})(window.DirectiveModule);