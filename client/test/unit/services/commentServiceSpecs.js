'use strict';

/* jasmine specs for services go here */

describe('CommentService', function() {
   var commentService,
      $httpBackend;
   var comments = [
      {authorName:'Jeff0', authorEmail:'a0@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 2, 3, 3, 3, 3)},
      {authorName:'Jeff1', authorEmail:'a1@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 3, 3, 3, 3, 3)},
      {authorName:'Jeff2', authorEmail:'a2@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 4, 3, 3, 3, 3)},
      {authorName:'Jeff3', authorEmail:'a3@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 5, 3, 3, 3, 3)},
      {authorName:'Jeff4', authorEmail:'a4@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 6, 3, 3, 3, 3)},
      {authorName:'Jeff5', authorEmail:'a5@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 7, 3, 3, 3, 3)},
      {authorName:'Jeff6', authorEmail:'a6@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 8, 3, 3, 3, 3)},
      {authorName:'Jeff7', authorEmail:'a7@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 9, 3, 3, 3, 3)},
      {authorName:'Jeff8', authorEmail:'a8@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 10, 3, 3, 3, 3)},
      {authorName:'Jeff9', authorEmail:'a9@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 12, 12, 3, 3, 3, 3)},
      {authorName:'Jeff10', authorEmail:'a10@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2014, 1, 2, 3, 3, 3, 3)},
      {authorName:'Jeff11', authorEmail:'a11@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 11, 2, 3, 3, 3, 3)},
      {authorName:'Jeff12', authorEmail:'a12@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 2, 2, 3, 3, 3, 3)},
      {authorName:'Jeff13', authorEmail:'a13@b.c', blogUrl: 'www.jeffjin.com', body: 'POST BODY', createdOn: new Date(2013, 1, 2, 3, 3, 3, 3)},
   ];

   beforeEach(function(){
      module('chinook.services');
      inject(function($injector) {
         $httpBackend = $injector.get('$httpBackend');
         $httpBackend.when('GET', '/api/comments').respond(comments);
      });
   });


   describe('comment service', function() {
      it('should retrieve all comments when no params are passed in', inject(['commentService', function(commentService) {

         expect(commentService).toBeDefined();

         commentService.getList().success(function(result){
            expect(result.length).toBe(14);
         });


         commentService.getList({from:'2013-12-01', to:'2014-1-1'}, 10).success(function(result){
            expect(result.length).toBe(10);
         });


         $httpBackend.flush();
      }]));
   });
});
