'use strict';

/* Controllers */
(function(module) {
   module.controller('HeaderCtrl', ['$scope', function($scope) {
      //console.log('Initializing Header Controller');
      $scope.headerText = 'Jeff Jin Blog';

      //console.log('"blog" translates to ' + translate('blog', 'zh') + ' in Chinese.');
   }]);
})(window.CtrlModule);