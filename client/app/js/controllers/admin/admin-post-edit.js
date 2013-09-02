'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostEditCtrl', ['$scope', '$routeParams', 'blogService',
    function($scope, $routeParams, blogService) {
      console.log('Initializing AdminPostEditCtrl Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      blogService.getPostDetails(postId).success(function(data, status, headers, config) {
        if(data && data.comments){
          for(var i = 0; i < data.comments.length; i++){
            if(data.comments[i].authorEmail){
              data.comments[i].authorEmailHash = hex_md5(data.comments[i].authorEmail);
            }
          }
        }
        $scope.post = data;
      }).error(function(data, status, headers, config) {
          alert(status + ',' +data);
        });
    }]);
})(window.CtrlModule);