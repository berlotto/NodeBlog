'use strict';

/* jasmine specs for controllers go here */

describe('BlogDetailsController', function(){

   var mockRouteParams, mockScope, mockBlogService, mockCmtService, mockSocketService, mockIdentity;
   var controller, $httpBackend;

   beforeEach(function(){
         mockRouteParams = {pid:'javascript-pitfalls'};
         mockScope = {};
         mockSocketService = {on:function(){}};
         mockIdentity = {};

         module(function($provide) {
            $provide.value('$routeParams', mockRouteParams);
         });
         module('chinook.controllers');
         module('chinook.services');
         inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockBlogService =  $injector.get('blogService');
            mockCmtService =  $injector.get('commentService');
         });
      }
   );


   it('should return a controller with with empty post in the scope when there is error in server',
      inject(function($rootScope, $controller) {
         $httpBackend.when('GET', '/api/posts/javascript-pitfalls').respond(500);

         var scope = $rootScope.$new();
         controller = $controller('BlogDetailsCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            blogService: mockBlogService,
            commentService: mockCmtService,
            socketService: mockSocketService,
            identity: mockIdentity
         });
         expect(controller).toBeDefined();
         controller.then(function(){
            expect(scope.hasEditRight).toBe(false);
            expect(scope.post).toBe({});
         }) ;

         $httpBackend.flush();
      }));

   it('should return a controller with specified post in the scope',
      inject(function($rootScope, $controller) {
         $httpBackend.when('GET', '/api/posts/javascript-pitfalls').respond(window.posts[2]);
         mockIdentity.currentUser = {isAdmin: true, isOwner: false};
         var scope = $rootScope.$new();
         controller = $controller('BlogDetailsCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            blogService: mockBlogService,
            commentService: mockCmtService,
            socketService: mockSocketService,
            identity: mockIdentity
         });
         expect(controller).toBeDefined();
         controller.then(function(){
            expect(scope.hasEditRight).toBe(true);
            expect(scope.post).toBeDefined();
            expect(scope.post.urlLink).toBe('javascript-pitfalls');
         }) ;

         $httpBackend.flush();
      }));
});
