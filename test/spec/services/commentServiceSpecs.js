'use strict';

/* jasmine specs for services go here */

describe('CommentService', function() {
   var commentService,
      $httpBackend;
   var comments = window.comments;

   beforeEach(function(){
      module('chinook.services');
      inject(function($injector) {
         $httpBackend = $injector.get('$httpBackend');
         $httpBackend.when('POST', '/api/comments/').respond(200);
         $httpBackend.when('PUT', '/api/comments/').respond(200);
      });
   });


   afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
   });

   describe('comment service', function() {
      it('should retrieve all comments when no params are passed in', inject(['commentService', function(commentService) {
         $httpBackend.when('GET', '/api/comments').respond(comments);

         expect(commentService).toBeDefined();

         commentService.getList().success(function(result){
            expect(result.length).toBe(14);
         });

         $httpBackend.flush();
      }]));

      it('should retrieve filtered comments when date range and max size are passed in', inject(['commentService', function(commentService) {
         $httpBackend.when('GET', '/api/comments?from=2013-12-01&to=2014-1-1&max=11').respond(comments.slice(4));
         commentService.getList({from:'2013-12-01', to:'2014-1-1'}, 11).success(function(result){
            expect(result.length).toBe(10);
         });

         $httpBackend.flush();
      }]));

      it('should parse one comment by setting auditing info', inject(['$sce', 'commentService', function($sce, commentService) {

         var parsedCmt = commentService.parseOne(comments[0]);
         expect(parsedCmt.authorName).toBe('Jeff0');
         expect(parsedCmt.authorEmailHash).toBe('b2576d62eb70e710cb4b543c9d6960be');
         expect(parsedCmt.body).toBe('POST BODY');
         //expect($sce.getTrustedHtml(parsedCmt.markedBody)).toBe('<p>POST BODY</p>');
         expect(parsedCmt.dateString).toBe('Thursday, January 2nd 2014, 3:03:03 am');
      }]));

      it('should parse one comment by setting auditing info', inject(['$sce', 'commentService', function($sce, commentService) {

         var parsedCmts = commentService.parse(comments);
         expect(parsedCmts[0].authorName).toBe('Jeff0');
         expect(parsedCmts[0].authorEmailHash).toBe('b2576d62eb70e710cb4b543c9d6960be');
         expect(parsedCmts[0].body).toBe('POST BODY');
         expect(parsedCmts[0].dateString).toBe('Thursday, January 2nd 2014, 3:03:03 am');

         expect(parsedCmts[1].authorName).toBe('Jeff1');
         expect(parsedCmts[1].dateString).toBe('Friday, January 3rd 2014, 3:03:03 am');

         expect(parsedCmts[2].authorName).toBe('Jeff2');
         expect(parsedCmts[2].dateString).toBe('Saturday, January 4th 2014, 3:03:03 am');

         expect(parsedCmts[4].authorName).toBe('Jeff4');
         expect(parsedCmts[4].dateString).toBe('Monday, January 6th 2014, 3:03:03 am');

      }]));

      it('should save new comments into database', inject(['commentService', function(commentService) {

         commentService.save(comments[0]).then(function(result){
            expect(result.status).toBe(200);
         });

         $httpBackend.flush();

      }]));

      it('should update existing comment in database', inject(['commentService', function(commentService) {

         commentService.save(comments[2]).then(function(result){
            expect(result.status).toBe(200);
         });

         $httpBackend.flush();

      }]));

      it('should find 3 comments in database when searched by angular', inject(['commentService', function(commentService) {
         $httpBackend.when('GET', '/api/comments?q=angular').respond([comments[0], comments[1], comments[2]]);
         commentService.search('angular').then(function(result){
            expect(result.data.length).toBe(3);
         });

         $httpBackend.flush();

      }]));

      it('should find no comments in database when searched by null or empty value', inject(['commentService', function(commentService) {
         commentService.search('').then(function(result){
            expect(result.data.length).toBe(0);
         });

         commentService.search().then(function(result){
            expect(result.data.length).toBe(0);
         });

         commentService.search(null).then(function(result){
            expect(result.data.length).toBe(0);
         });


      }]));
   });
});
