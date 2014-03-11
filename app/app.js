var app = angular.module('angApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'homeController',
                templateUrl: 'app/partials/home.html'
            })
        .when('/home',
        {
            controller: 'homeController',
            templateUrl: 'app/partials/home.html'
        })
        .when('/html1',
            {
                controller: 'html1Controller',
                templateUrl: 'app/partials/html1.html'
            })
        .when('/html2',
            {
               controller: 'html2Controller',
                templateUrl: 'app/partials/html2.html'
            })
        .when('/html3',
        {
            controller: 'html3Controller',
            templateUrl: 'app/partials/html3.html'
        })
        .when('/html4',
        {
            controller: 'html4Controller',
            templateUrl: 'app/partials/html4.html'
        })
        .otherwise({ redirectTo: '/html1' });
});