'use strict';

/* Filters */

(function(module){
   module.filter('pgLang', ['$q', function($q) {
      var dirtyWords = ['fuck', 'gay', 'lesbian'];
      return function(values) {
         var results =  _.filter(values, function(value){
            return _.indexOf(dirtyWords, value) === -1;
         });
         return results;
      };
   }]);
})(window.FilterModule);