'use strict';

/* Controllers */

(function(module) {
   module.controller('AdminPostEditCtrl', ['$scope', '$rootScope', '$routeParams','$location', '$window', '$timeout', '$q',
      'blogService', 'adminBlogService', 'storageService', 'identity', 'marked',
      function($scope, $rootScope, $routeParams, $location, $window, $timeout, $q,
               blogService, adminBlogService, storageService, identity, marked) {
         console.log('Initializing AdminPostEditCtrl Controller');
         var postId = $routeParams.pid;
         console.log('Edit post with id ' + postId);
         var key = $location.path() + JSON.stringify(identity.currentUser);
         var tempPost = storageService.get(key);
         if(tempPost && $window.confirm('Would like to restore unsaved work?')){
            $scope.post = tempPost;
            storageService.set(key, null);
         }
         else{
            blogService.getDetails(postId).then(
               function(result) {
                  $scope.markDown = marked;
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
                  $window.alert(result.status + ',' + result.data);
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
         //Save WIP
         $scope.$watch('post', function(newValue, oldValue) {
            console.log(key);
            storageService.set(key, newValue);
         }, true);
      }]);

})(window.CtrlModule);