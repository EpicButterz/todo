var app = angular.module('angApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
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
        .when('/register',
        {
            controller: 'registerController',
            templateUrl: 'app/partials/register.html'
        })
        .otherwise({ redirectTo: '/current' });
});