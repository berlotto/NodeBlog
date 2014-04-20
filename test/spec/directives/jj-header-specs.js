'use strict';

/* jasmine specs for directives go here */

describe('jj-header directive', function() {
   // we declare some global vars to be used in the tests
   var compile,        // our directive jqLite element
      rootScope;      // the scope where our directive is inserted
   var  template = '<div jj-header/></div>';
   // load the modules we want to test
   beforeEach(module('chinook.controllers'));
   beforeEach(module('chinook.directives'));
   beforeEach(inject(function($rootScope, $compile) {
      rootScope = $rootScope;
      compile = $compile;
   }));
   it('should have header html', function() {
      var $scope = rootScope.$new();
      var element = compile(template)($scope);
      $scope.$digest();
      var html = element.html();
      expect(html).toContain('The Law of the Jungle');
      expect(html).toContain('Jeff Jin');
   });
});
