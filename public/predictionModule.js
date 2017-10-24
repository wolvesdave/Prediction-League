var predictionApp = angular.module('predictionApp', []);

// ROUTES
/* predictionApp.config(function ($routeProvider) {

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

});*/

// CONTROLLERS
predictionApp.controller('homeController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In homeController");

    $http.get('http://localhost:3000/api/list_users')
        .success(function (result) {

            $scope.users = result;

        })
        .error(function (data, status) {

            console.log(data);

        });

}]);

predictionApp.controller('predictionController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In predictionController");

    user = "wolvesdave@gmail.com"; /*$scope.user; */
    round = 1; /* $scope.round;*/

    $scope.user = user; /*$scope.user; */
    $scope.round = round = 1; /* $scope.round;*/

    $http.get('http://localhost:3000/api/get_predictions/'+user+'/'+round)
      .success(function (result) {

          $scope.predictions = result;

      })
      .error(function (data, status) {

          console.log(data);

    });

}]);

predictionApp.controller('tableController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

  console.log("In tableController");

  $http.get('http://localhost:3000/api/get_table',)
    .success(function (result) {

        $scope.users = result;

    })
    .error(function (data, status) {

        console.log(data);

  });

  $scope.table = "This is a table"

}]);
