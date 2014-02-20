'use strict';

/* jasmine specs for controllers go here */

describe('BlogDetailsController', function(){

   var mockRouteParams, mockScope, mockBlogService, mockCmtService, mockSocketService, mockIdentity;
   var controller;
   beforeEach(function(){
         mockRouteParams = {pid:'javascript-pitfalls'};
         mockScope = {};
         mockBlogService = {getDetails:function(){
            return {success:function(){return {error: function(){}}}};
         }};
         mockCmtService = {};
         mockSocketService = {on:function(){}};
         mockIdentity = {};

         module(function($provide) {
            $provide.value('$routeParams', mockRouteParams);
         });
         module('chinook.controllers');

      }
   );


   it('should return blogDetailsController', inject(function($rootScope, $controller) {
      var scope = $rootScope.$new();
      controller = $controller('BlogDetailsCtrl', {
         $scope: scope,
         $routeParams: mockRouteParams,
         blogService: mockBlogService,
         commentService: mockCmtService,
         socketService: mockSocketService,
         identity: mockIdentity
      });
      //expect(controller).toBeDefined();
   }));
});
