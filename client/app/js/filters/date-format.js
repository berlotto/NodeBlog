'use strict';

/* Filters */

(function(module){
  module.filter('dateFormat', function() {

    return function(value, type) {
      if(type === 'short'){
          return moment(value).format("MMM Do YY");
      }
      if(type === 'long'){
          return moment(value).format('MMMM Do YYYY, h:mm:ss a');
      }
      return  moment(value).format("MMM Do YYYY");
    }
  });
})(window.FilterModule);