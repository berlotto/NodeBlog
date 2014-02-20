'use strict';

/* Controllers */

(function(module) {
  module.controller('AdminPostsCtrl', ['$scope', '$routeParams', 'blogService',
    function($scope, $routeParams, blogService) {
        console.log('Initializing AdminPostsCtrl Controller');
        var loadPosts = function(){
            blogService.getList({from:$routeParams.from, to:$routeParams.to}, 20)
                .success(function(data, status, headers, config) {
                    $scope.posts = data;
                }).
                error(function(data, status, headers, config) {
                  $scope.posts = [];
                  alert(status + ',' +data);
                });
        };

        $scope.deletePost = function(id){
          if(confirm('Are you sure you want to delete ' + id)){
            blogService.deletePost(id).then(function(){
                loadPosts();
            });
          }
        }

        loadPosts();
    }
  ]);
})(window.CtrlModule);