'use strict';

(function(exports){
   exports.FilterModule = angular.module('chinook.filters', []);
   exports.ServiceModule = angular.module('chinook.services', []);
   exports.FactoryModule = angular.module('chinook.factories', []);
   exports.DirectiveModule = angular.module('chinook.directives', []);
   exports.CtrlModule = angular.module('chinook.controllers', []);
   exports.MainModule = angular.module('chinook',
       ['ngRoute', 'chinook.filters', 'chinook.services', 'chinook.factories', 'chinook.directives', 'chinook.controllers']);

})(window);
