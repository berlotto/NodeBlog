'use strict';

/* jasmine specs for services go here */

describe('ImageService', function() {
    var $httpBackend;

    beforeEach(function(){
        module('chinook.services');

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });


    describe('getList', function() {
        it('should return specified number of images sorted by date', inject(['imageService', '$window', function(imgService, $window) {
           $window.devMode = false;
           $httpBackend.when('GET', '/api/images?max=10').respond(window.images.slice(6));
            expect(imgService.getList).toBeDefined();

            imgService.getList(10).then(function(result){
                var images = result.data;
                expect(images.length).toBe(10);
                expect(images[8].dateTime).toBeGreaterThan(images[9].dateTime);
                expect(images[6].dateTime).toBeGreaterThan(images[7].dateTime);
            });
           $httpBackend.flush();

        }]));
    });

    describe('getDetails', function() {
        it('should return specified image details by id', inject(['imageService',  '$window', function(imgService, $window) {
           $window.devMode = false;

           $httpBackend.when('GET', '/api/images/322').respond($window.images[4]);
            expect(imgService.getDetails).toBeDefined();

            imgService.getDetails('322').then(function(result){
               console.log(result.data);
                var image = result.data;
                expect(image.id).toBe('322');
            });
           $httpBackend.flush();

        }]));
    });
});
