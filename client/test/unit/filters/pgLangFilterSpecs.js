'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('chinook.filters'));


  describe('pgLang filter', function() {
    it('should remove inappropriate words', inject(function(pgLangFilter) {
      expect(pgLangFilter(['school', 'student', 'sex', 'fuck'])).toEqual(['school', 'student', 'sex']);
    }));
  });
});
