/**
 * Created by jeffjin on 2/22/2014.
 */

// the describe keyword is used to define a test suite (group of tests)
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
      if (!tpl) tpl = '/app/js/directives/templates/search.html';
      // inject allows you to use AngularJS dependency injection
      // to retrieve and use other services
      inject(function($compile) {
         var form = $compile(tpl)(scope);
         elm = form.find('div');
      });
      // $digest is necessary to finalize the directive generation
      scope.$digest();
   }

   it('should update form validity initialy', function() {
      // test with a min attribute that is out of bounds
      // first set the min value
      scope.testMin = 45;
      // then produce our directive using it
      compileDirective('<div rn-stepper min="testMin" ng-model="testModel"></div>');
      // this should impact the form validity
      expect(scope.form.$valid).toBeFalsy();
   });

   it('decrease button should be disabled when min reached', function() {
      // test the initial button status
      compileDirective('<div rn-stepper min="40" ng-model="testModel"></div>');
      expect(elm.find('button').attr('disabled')).not.toBeDefined();
      // update the scope model value
      scope.testModel = 40;
      // force model change propagation
      scope.$digest();
      // validate it has updated the button status
      expect(elm.find('button').attr('disabled')).toEqual('disabled');
   });
   // and many others...
});