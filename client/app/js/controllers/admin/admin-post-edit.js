'use strict';

/* Controllers */

(function(module) {
module.controller('AdminPostEditCtrl', ['$scope', '$rootScope', '$routeParams','$location', '$window', '$timeout', '$q',
    'blogService', 'adminBlogService', 'storage',
    function($scope, $rootScope, $routeParams, $location, $window, $timeout, $q, blogService, adminBlogService, storage) {
        console.log('Initializing AdminPostEditCtrl Controller');
        var postId = $routeParams.pid;
        var COMMENT_INSERT_KEY = 'comments-inserted-' + postId;
        console.log('Edit post with id ' + postId);
        var key = $location.path() + JSON.stringify($rootScope.loggedInAs);
        var tempPost = storage.get(key);
        if(tempPost && $window.confirm('Would like to restore unsaved work?')){
            $scope.post = tempPost;
            storage.set(key, null);
        }
        else{
            blogService.getPostDetails(postId).then(
                function(result) {
                    $scope.markDown = $window.marked;
                    if(result.data && result.data.comments){
                        for(var i = 0; i < result.data.comments.length; i++){
                            result.data.comments[i].markedBody = marked(result.data.comments[i].body);
                            if(result.data.comments[i].authorEmail){
                                result.data.comments[i].authorEmailHash = hex_md5(result.data.comments[i].authorEmail);
                            }
                        }
                    }
                    $scope.post = result.data;
                },
                function(result) {
                    alert(result.status + ',' + result.data);
                });
        }

        $scope.save = function(post){
            var successCallback = function(result){
              console.log(result);
              //redirect to page details in view mode
              $location.path('/posts/' + post.urlLink);
            };
            if(post._id){
              adminBlogService.updatePost(post.urlLink, post).success(successCallback);
            }
            else{
              adminBlogService.addPost(post).success(successCallback);
            }
        };

        $scope.$watch('post', function(newValue, oldValue) {
            console.log(key);
            storage.set(key, newValue);
        }, true);
    }]);

})(window.CtrlModule);