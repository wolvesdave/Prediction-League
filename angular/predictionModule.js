var predictionApp = angular.module('predictionApp', []);

predictionApp.controller('mainController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $scope.handle = '';

    $scope.lowercasehandle = function () {
        return $filter('lowercase')($scope.handle);
    };

    $scope.characters = 5;

    $http.get('/list_users')
        .success(function (result) {

            $scope.users = result;

        })
        .error(function (data, status) {

            console.log(data);

        });

    $scope.newRule = '';
    $scope.addRule = function () {
        $http.post('/api', { newRule: $scope.newRule })
            .success(function (result) {

                console.log(result);
                $scope.rules = result;
                $scope.newRule = '';

            })
            .error(function (data, status) {

                console.log(data);

            });
    };
}]);
