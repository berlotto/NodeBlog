'use strict';

/* jasmine specs for controllers go here */

describe('BlogController', function(){

    var mockRouteParams, mockScope, mockBlogService;
    var blogListController;
    beforeEach(function(){
            mockRouteParams = {from:'2010-12-1', to:'2014-1-1'};
            mockScope = {};
            var serviceStub = sinon.stub();
            mockBlogService = {getPosts:function(){
                return {success:function(){return {error: function(){}}}};
            }}

            module(function($provide) {
                $provide.value('$routeParams', mockRouteParams);
            });
            module('chinook.controllers');

        }
    );


    it('should return 4 posts from 2010 to 2014', inject(function($rootScope, $controller) {
        var scope = $rootScope.$new();
        // how about version service?
        blogListController = $controller('BlogListCtrl', {$scope: scope, blogService: mockBlogService, $routeParams: mockRouteParams});
    }));
});
