'use strict';

/* Controllers */

(function (module) {
    console.log('registering AdminTasksCtrl...')

    module.lazy.controller('AdminTasksCtrl', ['$scope', function ($scope) {
        console.log('executingAdminTasksCtrl Controller');

    }]
    );
})(window.app);