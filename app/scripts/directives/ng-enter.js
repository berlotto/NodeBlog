'use strict';

(function(module){
   module.directive('ngEnter', function () {
      return function (scope, element, attrs) {
         element.bind('keydown keypress', function (event) {
            //console.log('key pressed', event.which);
            if(event.which === 13) {
               scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
               });

               event.preventDefault();
            }
         });
      };
   });
})(window.DirectiveModule);