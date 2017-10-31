// ROUTES
predictionApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'public/pages/user.html',
        controller: 'userController'
    })

    .when('/prediction', {
        templateUrl: 'public/pages/predictions.html',
        controller: 'predictionController'
    })

    .when('/table', {
        templateUrl: 'public/pages/table.html',
        controller: 'tableController'
    })

});
