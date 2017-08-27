'use strict';

angular.module('thassiov.home', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('main',{
            url: '/',
            templateUrl: 'app/partials/main.html',
            controller: 'HomeCtrl'
        });
}])

.controller('HomeCtrl', [function() {
    console.log('hello');
}]);
