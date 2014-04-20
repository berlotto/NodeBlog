'use strict';

/* jasmine specs for services go here */

describe('StorageService', function() {
   var storageService,
      $httpBackend;

   beforeEach(function(){
      module('chinook.services');

      inject(function($injector) {
         $httpBackend = $injector.get('$httpBackend');
         storageService = $injector.get('storageService');
      });
   });


   describe('storage on client side', function() {
      it('should save partial works in local storage or fallback persistent storage',
         inject(['storageService', function(storageService) {

            expect(storageService).toBeDefined();

            storageService.set('key1', {value: 'value1'});
            var result1 = storageService.get('key1');
            expect(result1.value).toBe('value1');

            var result2 = storageService.get('key2');
            expect(result2).toBe(undefined);

         }]));
   });
});
