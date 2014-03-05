'use strict';

/* jasmine specs for directives go here */

describe('ng-enter directive', function() {
    // we declare some global vars to be used in the tests
    var element,        // our directive jqLite element
        $scope;      // the scope where our directive is inserted
    var  template = '<div id=""><input id="submit" type="text" value="" ng-model="keyword" ng-enter="search(keyword)"/></div>';
    // load the modules we want to test
    beforeEach(module('chinook.directives'));

    beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new();
        element = angular.element(template);
        $compile(element)($scope);
    }));

    it('should trigger click handler upon enter key press ', function() {
        $scope.keyword = 'angular';
        $scope.search = function(keyword){
            console.log('search is called', keyword);
            expect(keyword).toBe('angular');
        };
        $scope.$digest();
        var input = element.find('#submit');
        var e = $.Event("keypress");
        e.which = 13; //choose the one you want
        e.keyCode = 13;
        input.trigger(e);
        expect(input.val()).toBe('angular');
    });
});
