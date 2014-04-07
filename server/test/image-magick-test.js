(function(){

   var assert = require("assert");
   var fs = require('fs');
   var imgSvc = require("../services/image-search-svc");
   var chai = require("chai");
   var expect = require('chai').expect;
   var should = require('chai').should();
   var chaiAsPromised = require("chai-as-promised");

   chai.use(chaiAsPromised);


   describe('ImageService', function(){
//      describe('getInfo()', function() {
//         it('should return detailed image information including width and height', function(done){
//
//            console.log('reading images...');
//            var result = imgSvc.getInfo('/Users/jeffjin/Pictures/_DSL7401.JPG');
//
//            result.then(function(info){
//                  console.log('verifying image width ...', info.width);
//                  console.log('verifying image height ...', info.height);
//                  console.log('verifying image format ...', info.format);
//
//                  assert.equal(info.width, 4928);
//                  assert.equal(info.height, 3264);
//                  assert.equal(info.format, 'JPEG');
//
//               },
//               function(err){
//                  console.log('error images...', info);
//               }
//            ).should.notify(done);
//         });
//
//      });
//
//      describe('findImageFiles(date)', function() {
//         it('should return the image files created at the specified date', function(done){
//
//            console.log('finding images...');
//            var folder = '/Users/jeffjin/Pictures/';
//            imgSvc.findByDate(new Date(2014, 3, 11, 1, 1, 1, 1), folder).then(function(images){
//                  assert.equal(images.length, 31);
//               },
//               function(err){
//                  console.log('error images...', info);
//               }
//            ).should.notify(done);
//         });
//
//      });
//
//      describe('resize 2880', function(){
//         it('should return resized image of width 2880px and height ratio preserved', function(){
//
//            console.log('resizing images...');
//            var imgResizer = require('../services/image-resize-svc');
//            imgResizer.resize(['_DSL7409.JPG', '_DSL7407.JPG'], [2880],
//               '/Users/jeffjin/Pictures/');
//
//
//         });
//
//      });
//
//      describe('resize many images', function(){
//         it('should return resized images of width and height ratio preserved', function(){
//
//            console.log('resizing images...');
//            var imgResizer = require('../services/image-resize-svc');
//            imgResizer.resize(['_DSC7370.JPG', '_DSC7371111.JPG'], [2560, 2048, 1920, 1600, 1280, 1024, 768, 640, 480, 320],
//               '/Users/jeffjin/Pictures/');
//
//
//         });
//
//      });

      describe('resize many images in folder', function(){
         it('should return resized images of width and height ratio preserved', function(){

            console.log('resizing images...');
            var imgResizer = require('../services/image-resize-svc');
            imgResizer.resizeByFolder('/Users/jeffjin/Pictures/', [480, 320])
               .then(function(results){
                    console.log('results', results);
               });
         });

      });
   });

})();
