'use strict';

/* jasmine specs for controllers go here */

describe('BlogListController', function(){

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


   it('should return BlogListCtrl', inject(function($rootScope, $controller) {
      var scope = $rootScope.$new();
      blogListController = $controller('BlogListCtrl', {$scope: scope, blogService: mockBlogService, $routeParams: mockRouteParams});
      expect(blogListController).toBeDefined();
   }));
});
