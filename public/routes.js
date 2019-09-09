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

    .when('/add_round', {
        templateUrl: 'public/pages/add_round.html',
        controller: 'addRoundController'
    })

    .when('/close_round', {
        templateUrl: 'public/pages/close_round.html',
        controller: 'closeRoundController'
    })

    .when('/close_month', {
        templateUrl: 'public/pages/close_month.html',
        controller: 'closeMonthController'
    })

});
