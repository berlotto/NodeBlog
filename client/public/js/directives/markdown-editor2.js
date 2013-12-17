'use strict';

/* Directives */


(function (module) {
    module.directive('wmdEditor', ['$window', function ($window) {
        var initialize = function (scope) {
            console.log('Initializing wmdEditor directive ...');
            scope.states = [];
        };
        var getSelection = function (elm) {
            var selectedText, startPos, endPos;
            // IE version
            if (document.selection !== undefined) {
                elm.focus();
                // The current selection
                var range = document.selection.createRange();
                selectedText = range.text;
                // We'll use this as a 'dummy'
                var stored_range = range.duplicate();
                // Select all text
                stored_range.moveToElementText(elm);
                // Now move 'dummy' end point to end point of original range
                stored_range.setEndPoint('EndToStart', range);
                // Now we can calculate start and end points
                startPos = stored_range.text.length - 5;
                endPos = startPos + selectedText.length;
            }
            // Mozilla version
            else if (elm.selectionStart !== undefined) {
                startPos = elm.selectionStart;
                endPos = elm.selectionEnd;
                selectedText = elm.value.substring(startPos, endPos);
            }
            console.log("You selected: " + selectedText);
            return {start: startPos, end: endPos, text: selectedText};
        };

        var setSelectionRange = function (input, selectionStart, selectionEnd) {
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
        };

        function setCursor(input, pos) {
            setSelectionRange(input, pos, pos);
        }

        var insertTextAtCursor = function (el, text) {
            var val = el.value, endIndex, range;
            if (typeof el.selectionStart !== "undefined" && typeof el.selectionEnd !== "undefined") {
                endIndex = el.selectionEnd;
                el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
                el.selectionStart = el.selectionEnd = endIndex + text.length;
            } else if (typeof document.selection !== "undefined" && typeof document.selection.createRange !== "undefined") {
                el.focus();
                range = document.selection.createRange();
                range.collapse(false);
                range.text = text;
                range.select();
            }
        };

        //set texts around the selected element
        var setTextAroundSelection = function (el, txtPre, txtPost, preCount, postCount) {
            var val = el.value, range, startPos, endPos,
                textBeforeSelection, textAfterSelection;
            if (typeof el.selectionStart !== "undefined" && typeof el.selectionEnd !== "undefined") {
                startPos = el.selectionStart;
                endPos = el.selectionEnd;
                var selectedTxt = val.substring(startPos, endPos);
                selectedTxt = $.trim(selectedTxt);
                if (!selectedTxt) {
                    return;
                }
                endPos = startPos + selectedTxt.length;
                //append and prepend markdown symbols
                textBeforeSelection = val.substr(0, startPos);
                textAfterSelection = val.substr(endPos, val.length);
                el.value = textBeforeSelection + txtPre + selectedTxt + txtPost + textAfterSelection;
                if (!preCount) {
                    preCount = txtPre.length;
                }
                if (!postCount) {
                    postCount = txtPost.length;
                }
                setSelectionRange(el, startPos + preCount, endPos + postCount);
            } else if (typeof document.selection !== "undefined" && typeof document.selection.createRange !== "undefined") {
                el.focus();
                range = document.selection.createRange();
                range.collapse(false);
                var selectedTxt1 = range.text;
                if (!selectedTxt1) {
                    return;
                }
                selectedTxt1 = $.trim(selectedTxt1);
                range.text = txtPre + selectedTxt1 + txtPost;
                range.select();
            }
        };

        //remove texts around the selected element
        var removeTextAroundSelection = function (el, txtPre, txtPost) {
            var val = el.value, range, startPos, endPos,
                textBeforeSelection, textAfterSelection;
            if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
                startPos = el.selectionStart;
                endPos = el.selectionEnd;
                var selectedTxt = val.substring(startPos, endPos);
                selectedTxt = $.trim(selectedTxt);
                endPos = startPos + selectedTxt.length;
                //remove the previously applied markdowns
                textBeforeSelection = val.substr(0, startPos - txtPre.length);
                textAfterSelection = val.substr(endPos + txtPost.length);
                el.value = textBeforeSelection + selectedTxt + textAfterSelection;
                setSelectionRange(el, startPos - txtPre.length, endPos - txtPost.length);
            } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
                el.focus();
                range = document.selection.createRange();
                range.collapse(false);
                var selectedTxt = range.text;
                selectedTxt = $.trim(selectedTxt);
                startPos = val.indexOf(selectedTxt);
                endPos = startPos + selectedTxt.length;
                textBeforeSelection = val.substr(0, startPos - txtPre.length);
                textAfterSelection = val.substr(endPos + txtPost.length);
                el.value = textBeforeSelection + selectedTxt + textAfterSelection;
                range.text = selectedTxt;
                range.select();
            }
        };

        //get text before and after the selected text until the txtPre or txtPost
        var getTextAroundSelection = function (el, preCount, postCount) {
            var val = el.value, range, startPos, endPos, selectedTxt, preTemp, postTemp;

            if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
                startPos = el.selectionStart;
                endPos = el.selectionEnd;
                selectedTxt = val.substring(startPos, endPos);
                selectedTxt = $.trim(selectedTxt);
                endPos = startPos + selectedTxt.length;
            } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
                el.focus();
                range = document.selection.createRange();
                range.collapse(false);
                selectedTxt = $.trim(range.text);
                startPos = val.indexOf(selectedTxt);
                endPos = startPos + selectedTxt.length;
            }
            preTemp = val.substring(startPos - preCount, startPos);
            postTemp = val.substring(endPos, endPos + postCount);
            return {pre: preTemp, post: postTemp};
        };

        var setupEvents = function (scope, elm) {
            console.log('setting up events ...');

            scope.bold = function () {
                var prePostTxt = getTextAroundSelection(elm, 2, 2);
                if (prePostTxt.pre === '**' && prePostTxt.post === '**') {
                    removeTextAroundSelection(elm, '**', '**');
                }
                else {
                    setTextAroundSelection(elm, '**', '**');
                }
            };
            scope.italic = function () {
                var prePostTxt = getTextAroundSelection(elm, 3, 3);
                if (prePostTxt.pre === '***' && prePostTxt.post === '***') {
                    removeTextAroundSelection(elm, '*', '*');
                }
                else if (_(prePostTxt.pre).endsWith('**') && _(prePostTxt.post).startsWith('**')) {
                    setTextAroundSelection(elm, '*', '*');
                }
                else if (_(prePostTxt.pre).endsWith('*') && _(prePostTxt.post).startsWith('*')) {
                    removeTextAroundSelection(elm, '*', '*');
                }
                else {
                    setTextAroundSelection(elm, '*', '*');
                }
            };
            var showDialog = function (show) {
                scope.showDialog = show;
                scope.showHyperlinkDialog = show;
            };

            scope.hyperlink = function () {
                var val = elm.value, textBeforeSelection, textAfterSelection;
                var selection = getSelection(elm);
                if (!selection.text) {
                    return;
                }
                var prePostTxt = getTextAroundSelection(elm, 1, 1);
                //if hyperlink is already applied, remove it
                if (prePostTxt.pre === '[' && prePostTxt.post === ']') {
                    var tempStart = val.indexOf('(', selection.end);
                    var tempEnd = val.indexOf(')', selection.end);
                    if (tempEnd > tempStart) {
                        textBeforeSelection = val.substr(0, selection.start - 1);
                        textAfterSelection = val.substr(tempEnd + 1);
                        elm.value = textBeforeSelection + selection.text + textAfterSelection;
                        setSelectionRange(elm, selection.start - 1, selection.end - 1);
                    }
                }
                else {
                    showDialog(true);
                }
            };
            scope.setHyperlink = function (link) {
                console.log('validating hyperlink ' + link);
                //TODO: validate using ajax
                setTextAroundSelection(elm, '[', '](' + link + ')', 1, 1);
                scope.linkUrl = '';
                showDialog(false);
            };
            scope.cancelHyperlink = function () {
                scope.linkUrl = '';
                showDialog(false);
            };
            //TODO: find all lines and prepend '>'
            scope.blockQuote = function () {
                var selection = getSelection(elm);
                var textBeforeSelection = elm.value.substr(0, selection.start);
                var textAfterSelection = elm.value.substr(selection.end, elm.value.length);
                var pattern = /(\n\s*\S)/g;
                var match = pattern.exec(selection.text);

                var selectedText = selection.text.replace(pattern, match[1]);

                elm.value = textBeforeSelection + selectedText + textAfterSelection;
            };
            scope.image = function () {

            };
            scope.codify = function () {

            };
            scope.numberedList = function () {

            };
            scope.bulletedList = function () {

            };
            scope.heading = function () {

            };
            scope.hRule = function () {

            };
            scope.redo = function () {

            };
            scope.undo = function () {

            };
        };
        return {
            restrict: 'EA',
            //transclude: true, // It transcludes(transfer includes) the contents of the directive into the template
            replace: true, // The element containing the directive will be replaced with the template
            templateUrl: './js/directives/templates/markdown-editor-template.html',
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
                undo: '&',
                setHyperlink: '&',
                cancelHyperlink: '&'
            },
            link: function (scope, element, attrs) {
                initialize(scope);
                setupEvents(scope, $('#wmd-input', element)[0]);

                scope.markdown = function (content) {
                    //processing content
                    //console.log('processing content ' + content);
                    return content;
                };
            }
        };
    }]);
})(window.app);