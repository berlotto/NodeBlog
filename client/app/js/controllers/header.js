'use strict';

/* Controllers */
(function(module) {
module.controller('HeaderCtrl', ['$scope', 'localize', function($scope, translate) {
     //console.log('Initializing Header Controller');
     $scope.headerText = 'The law of the jungle';

     //console.log('"blog" translates to ' + translate('blog', 'zh') + ' in Chinese.');
  }]);
})(window.CtrlModule);