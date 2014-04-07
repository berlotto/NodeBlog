(function(){

   var assert = require("assert");
   var fs = require('fs');
   var storageSvc = require("../services/storage-svc");
   var chai = require("chai");
   var expect = require('chai').expect;
   var should = require('chai').should();
   var chaiAsPromised = require("chai-as-promised");
   var _ = require('lodash/dist/lodash.underscore');

   chai.use(chaiAsPromised);


   describe('StorageService', function() {
      describe('createFolder', function () {
         it('should create a folder by name if it does not exist', function (done) {

            console.log('create folders...');
            var result = storageSvc.createFolders(['480', '768', '1024', '1280', '1600'], '/Users/jeffjin/Pictures/');

            result.then(function (folderNames) {
                  _.each(folderNames, function (folder) {
                     if(folder){
                        console.log('folder "' + folder + '" has been successfully created ...');
                     }
                  });

                  assert.equal(folderNames.length, 5);
               },
               function (err) {
                  console.log('error creating folders...', ['480', '768', '1024', '1280', '1600']);
                  assert.fail();
               }
            ).should.notify(done);
         });

      });

      describe('findImages', function () {
         it('should find all images in specified folders', function (done) {

            var result = storageSvc.findImages(['/Volumes/DATA/Dropbox/Photos/', '/Users/jeffjin/Pictures/']);

            result.then(function (files) {
                  console.log('files', files);
                  _.each(files, function (file) {
                     //console.log('file', file);
                     //assert.equal(file.endsWith('.jpg'), true);
                  });
               },
               function (err) {
                  console.log('error finding images...');
                  assert.fail();
               }
            ).should.notify(done);
         });

         it('should find all images in specified folder', function (done) {

            var result = storageSvc.getImageNamesInFolder('/Volumes/DATA/Dropbox/Photos/');

            result.then(function (files) {
                  console.log('test files', files);
               },
               function (err) {
                  console.log('error finding images...');
                  assert.fail();
               }
            ).should.notify(done);
         });

      });
   });
})();
