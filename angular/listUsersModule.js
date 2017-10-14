var list_usersApp = angular.module('list_usersApp', []);

list_usersApp.controller('mainController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $http.get('/api/list_users')
        .success(function (result) {

            $scope.users = result;
            console.log(result);

        })
        .error(function (data, status) {

            console.log(data);

        });

}]);
