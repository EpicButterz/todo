var app = angular.module('angApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',
        {
            controller: 'authenticateController',
            templateUrl: 'app/partials/authenticate.html'
        })
        .when('/current',
            {
                controller: 'currentController',
                templateUrl: 'app/partials/current.html'
            })
        .when('/archive',
            {
                controller: 'archiveController',
                templateUrl: 'app/partials/archive.html'
            })
        .when('/auth',
        {
            controller: 'authenticateController',
            templateUrl: 'app/partials/authenticate.html'
        })
        .otherwise({ redirectTo: '/current' });
});