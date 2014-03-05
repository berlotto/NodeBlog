'use strict';

/* Controllers */

(function(module) {
    module.controller('BlogListCtrl', ['$scope', 'blogService', '$routeParams',
        function($scope, blogService, $routeParams) {
            //console.log('Initializing Blog List Controller');
            $scope.posts = null;
            return blogService.getList({from:$routeParams.from, to:$routeParams.to}, 20)
                .then(function(result) {
                        $scope.posts = result.data;
                    },
                    function(data) {
                        console.error('BlogListCtrl error', data);
                        $scope.posts = [];
                    });

        }]);
})(window.CtrlModule);