'use strict';

/* jasmine specs for services go here */

describe('StorageService', function() {
    var storageService,
        $httpBackend;

  beforeEach(function(){
      module('chinook.services');

      inject(function($injector) {
          $httpBackend = $injector.get('$httpBackend');
          storageService = $injector.get('StorageService');
      });
  });


  describe('storage on client side', function() {
    it('should save partial works in local storage or fallback persistent storage', inject(function(StorageService) {

      expect(StorageService).toBeDefined();

      StorageService.set('key1', {value: 'value1'});
      var result = StorageService.get('key1');

        expect(result.value).toBe('value1');

    }));
  });
});
