'use strict';

/* jasmine specs for controllers go here */

describe('BlogListController', function(){

   var mockRouteParams, mockScope, mockBlogService;
   var blogListController, $httpBackend;
   beforeEach(function(){
         mockRouteParams = {from:'2010-12-1', to:'2014-1-1'};
         mockScope = {};

         module(function($provide) {
            $provide.value('$routeParams', mockRouteParams);
         });
         module('chinook.controllers');
         module('chinook.services');
         inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
         });
      }
   );


   it('should return BlogListCtrl with default setup', inject(['$rootScope', '$controller', 'blogService', function($rootScope, $controller, blogService) {
      $httpBackend.when('GET', '/api/posts?from=2010-12-1&to=2014-1-1&max=20').respond(window.posts);
      var scope = $rootScope.$new();
      blogListController = $controller('BlogListCtrl', {$scope: scope, blogService: blogService, $routeParams: mockRouteParams});
      expect(blogListController).toBeDefined();
      blogListController.then(function(){
         expect(scope.posts.length).toBe(window.posts.length);
      });

      $httpBackend.flush();
   }]));

   it('should return empty posts with error in the api call ', inject(['$rootScope', '$controller', 'blogService', function($rootScope, $controller, blogService) {
      $httpBackend.when('GET', '/api/posts?from=2010-12-1&to=2014-1-1&max=20').respond(500);
      var scope = $rootScope.$new();
      blogListController = $controller('BlogListCtrl', {$scope: scope, blogService: blogService, $routeParams: mockRouteParams});
      expect(blogListController).toBeDefined();
      blogListController.then(function(){
         expect(scope.posts.length).toBe(0);
      });

      $httpBackend.flush();
   }]));
});
