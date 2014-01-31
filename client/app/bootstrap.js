'use strict';

(function(exports){
   exports.FilterModule = angular.module('chinook.filters', []);
   exports.ServiceModule = angular.module('chinook.services', []);
   exports.FactoryModule = angular.module('chinook.factories', []);
   exports.ProviderModule = angular.module('chinook.providers', []);
   exports.DirectiveModule = angular.module('chinook.directives', []);
   exports.CtrlModule = angular.module('chinook.controllers', []);
   exports.MainModule = angular.module('chinook',
       ['ngRoute', 'chinook.filters', 'chinook.services', 'chinook.factories',
           'chinook.providers', 'chinook.directives', 'chinook.controllers']).
       config(['localizeProvider', function(localizeProvider){
           localizeProvider.setDefaultLocale('en');
       }]).
       run(function(){

       });

})(window);
