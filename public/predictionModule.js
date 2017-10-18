var predictionApp = angular.module('predictionApp', []);

// ROUTES
predictionApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })

    .when('/prediction', {
        templateUrl: 'pages/prediction.htm',
        controller: 'predictionController'
    })

    .when('/table', {
        templateUrl: 'pages/table.htm',
        controller: 'tableController'
    })

});

// CONTROLLERS
predictionApp.controller('homeController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $http.get('http://localhost:3000/api/list_users')
        .success(function (result) {

            $scope.users = result;

        })
        .error(function (data, status) {

            console.log(data);

        });

}]);

predictionApp.controller('predictionController', ['$scope', function($scope) {

}]);

predictionApp.controller('tableController', ['$scope', function($scope) {

}]);
