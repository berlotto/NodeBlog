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
        it('should return specified number of images sorted by date', inject(['imageService', function(imgService) {

           $httpBackend.when('GET', '/api/images?max=10').respond(window.images.slice(6));
            expect(imgService).toBeDefined();

            imgService.getList(10).then(function(result){
                var images = result.data;
                expect(images.length).toBe(10);
                expect(images[8].dateTime).toBeGreaterThan(images[9].dateTime);
                expect(images[6].dateTime).toBeGreaterThan(images[7].dateTime);
            });
           $httpBackend.flush();

        }]));
    });
});
