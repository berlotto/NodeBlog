'use strict';

/* jasmine specs for directives go here */

describe('ng-enter directive', function() {
   // we declare some global vars to be used in the tests
   var elm,        // our directive jqLite element
      scope;      // the scope where our directive is inserted

   // load the modules we want to test
   beforeEach(module('chinook.directives'));

   // before each test, creates a new fresh scope
   // the inject function interest is to make use of the angularJS
   // dependency injection to get some other services in our test
   // here we need $rootScope to create a new scope
   beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
   }));

   function compileDirective(tpl) {
      // function to compile a fresh directive with the given template, or a default one
      // compile the tpl with the $rootScope created above
      // wrap our directive inside a form to be able to test
      // that our form integration works well (via ngModelController)
      // our directive instance is then put in the global 'elm' variable for further tests
      if (!tpl) tpl = '<div id=""><input id="submit" type="text" value="" ng-model="keyword" ng-enter="search(keyword)"/></div>';
      // inject allows you to use AngularJS dependency injection
      // to retrieve and use other services
      inject(function($compile) {
         var elem = $compile(tpl)(scope);
         elm = elem.find('#submit');
      });
      // $digest is necessary to finalize the directive generation
      scope.$digest();
   }

   it('should trigger click handler upon enter key press ', function() {
      compileDirective();
      expect(elm).toBeDefined();
   });
});
