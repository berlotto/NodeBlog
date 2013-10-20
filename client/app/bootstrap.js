'use strict';

(function(exports){
   exports.FilterModule = angular.module('chinook.filters', []);
   exports.ServiceModule = angular.module('chinook.services', []);
   exports.DirectiveModule = angular.module('chinook.directives', []);
   exports.CtrlModule = angular.module('chinook.controllers', []);
   exports.MainModule = angular.module('chinook',
       ['chinook.filters', 'chinook.services', 'chinook.directives', 'chinook.controllers']);

})(window);
