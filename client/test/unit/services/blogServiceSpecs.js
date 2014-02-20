'use strict';

/* jasmine specs for services go here */

describe('BlogService', function() {
   var $httpBackend;


   beforeEach(function(){
      module('chinook.services');
      inject(function($injector) {
         $httpBackend = $injector.get('$httpBackend');
         $httpBackend.when('POST', '/api/posts/').respond(200);
         $httpBackend.when('PUT', '/api/posts/').respond(200);
      });
   });

   afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
   });

   describe('blog service', function() {
      it('should retrieve all 4 posts when no params are passed in', inject(['blogService', function(blogService) {
         $httpBackend.when('GET', '/api/posts').respond(window.posts);

         expect(blogService).toBeDefined();

         blogService.getList().success(function(result){
            expect(result.length).toBe(4);
         });

         $httpBackend.flush();
      }]));

      it('should retrieve 2 posts when params are passed in', inject(['blogService', function(blogService) {
         $httpBackend.when('GET', '/api/posts?from=2013-12-01&to=2014-1-1&max=3').respond(window.posts.slice(2));

         blogService.getList({from:'2013-12-01', to:'2014-1-1'}, 3).success(function(result){
            expect(result.length).toBe(2);
         });

         $httpBackend.flush();
      }]));

      it('should retrieve 1 post when "new" is passed in', inject(['blogService', function(blogService) {
         blogService.getDetails('new').then(function(result){
            expect(result.data.topic).toBe('topic for the new post');
            expect(result.data.summary).toBe('please write a summary');
            expect(result.data.disableComment).toBe(false);
         });
      }]));

      it('should retrieve 1 post when id is passed in', inject(['blogService', function(blogService) {
         $httpBackend.when('GET', '/api/posts/javascript-pitfalls').respond(window.posts[2]);

         blogService.getDetails('javascript-pitfalls').then(function(result){
            expect(result.data.topic).toBe('Javascript Pitfalls');
            expect(result.data.createdBy).toBe('Jeff Jin');
            expect(result.data.status).toBe('public');
            expect(result.data.summary).toBe('A list of potential areas where .net or Java developers easily make mistakes in Javascript programming.');
         });

         $httpBackend.flush();
      }]));

      it('should retrieve no post when invalid id is passed in', inject(['blogService', function(blogService) {
         $httpBackend.when('GET', '/api/posts/javascript-pitfalls111').respond(null);

         blogService.getDetails('javascript-pitfalls111').then(function(result){
            expect(result.data).toBe(null);
         });

         $httpBackend.flush();
      }]));

      it('should retrieve 3 post when only max param is passed in', inject(['blogService', function(blogService) {
         $httpBackend.when('GET', '/api/posts?max=3').respond(window.posts.slice(1));

         blogService.getList(null, 3).success(function(result){
            expect(result.length).toBe(3);
         });

         $httpBackend.flush();
      }]));

   });
});
