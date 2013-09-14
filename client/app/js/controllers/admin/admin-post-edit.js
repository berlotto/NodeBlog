'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostEditCtrl', ['$scope', '$routeParams','$location', 'blogService', '$window',
    function($scope, $routeParams, $location, blogService, window) {
      console.log('Initializing AdminPostEditCtrl Controller');
      var postId = $routeParams.pid;
      var commentInsertKey = 'comments-inserted-' + postId;
      blogService.getPostDetails(postId).success(function(data, status, headers, config) {
        $scope.markDown = window.marked;
        if(data && data.comments){
          for(var i = 0; i < data.comments.length; i++){
            data.comments[i].markedBody = marked(data.comments[i].body);
            if(data.comments[i].authorEmail){
              data.comments[i].authorEmailHash = hex_md5(data.comments[i].authorEmail);
            }
          }
        }
        $scope.post = data;
      }).error(function(data, status, headers, config) {
          alert(status + ',' +data);
        });
      $scope.save = function(post){
        blogService.savePost(post).success(function(result){
          console.log(result);
          //redirect to page details in view mode
          //TODO: $location.move()
        });
      };
    }]);

})(window.CtrlModule);