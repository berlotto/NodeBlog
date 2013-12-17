'use strict';

require.config({
    baseUrl: '/client',
    paths: {}
});

require
(
    [
        'appModule'
    ],
    function (module) {
        angular.bootstrap(document, ['chinook']);
    }
);