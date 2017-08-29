'use strict';

angular.module('thassiov', ['ui.router', 'thassiov.home'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);

