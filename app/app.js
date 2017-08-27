'use strict';

angular.module('thassiov', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
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
