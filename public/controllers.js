// CONTROLLERS
predictionApp.controller('userController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In userController");

    $http.get('http://localhost:3000/api/sysparms')
      .success(function (result) {
        /*email = "wolvesdave@gmail.com";
        round = 1; */
        $scope.email = result.email;
        $scope.round = result.round;

    $http.get('http://localhost:3000/api/get_user/'+$scope.email)
        .success(function (result) {

            $scope.users = result;

        })
        .error(function (data, status) {

            console.log(data);

        });
    });
}]);

predictionApp.controller('predictionController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In predictionController");

    /* user = "wolvesdave@gmail.com"; */
    /* round = 1;  */

    user = $scope.user; /*$scope.user; */
    round = $scope.round; /* $scope.round;*/

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

}]);
