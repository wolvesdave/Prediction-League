// CONTROLLERS
predictionApp.controller('userController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In userController");

    $http.get('http://localhost:3000/api/sysparms')
      .success(function (result) {

        $scope.email = result.email;
        $scope.round = result.currentRound;
        $scope.month = result.currentMonth;

    $http.get('http://localhost:3000/api/get_user/'+$scope.email+'/'+$scope.month)
        .success(function (result) {

            $scope.user = result[0];

        })
        .error(function (data, status) {

            console.log(data);

        });
    });
}]);

predictionApp.controller('predictionController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    console.log("In predictionController");

    $http.get('http://localhost:3000/api/sysparms')
      .success(function (result) {

        $scope.email = result.email;
        $scope.round = result.currentRound;
        $scope.month = result.currentMonth;

    $http.get('http://localhost:3000/api/get_predictions/'+$scope.email+'/'+$scope.round)
      .success(function (result) {

          $scope.predictions = result;

      })
      .error(function (data, status) {

          console.log(data);

    });
});
}]);

predictionApp.controller('tableController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

  console.log("In tableController");

  $http.get('http://localhost:3000/api/sysparms')
    .success(function (result) {

      $scope.email = result.email;
      $scope.round = result.currentRound;
      $scope.month = result.currentMonth;

  $http.get('http://localhost:3000/api/get_table',)
    .success(function (result) {

        $scope.users = result;

    })
    .error(function (data, status) {

        console.log(data);

  });
});
}]);

predictionApp.controller('addRoundController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

  console.log("In addRoundController");

  $http.get('http://localhost:3000/api/sysparms')
    .success(function (result) {

      $scope.email = result.email;
      $scope.round = result.currentRound;
      $scope.month = result.currentMonth;

  $http.get('http://localhost:3000/api/get_table',)
    .success(function (result) {

        $scope.users = result;
        console.log("Here's the gibber" );

    })
    .error(function (data, status) {

        console.log(data);

  });
});
}]);

predictionApp.controller('closeRoundController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

  console.log("In closeRoundController");

  $http.get('http://localhost:3000/api/sysparms')
    .success(function (result) {

      $scope.email = result.email;
      $scope.round = result.currentRound;
      $scope.month = result.currentMonth;

  $http.get('http://localhost:3000/api/get_table',)
    .success(function (result) {

        $scope.users = result;
        console.log("Here's the gibber" );

    })
    .error(function (data, status) {

        console.log(data);

  });
});
}]);

predictionApp.controller('closeMonthController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

  console.log("In closeMonthController");

  $http.get('http://localhost:3000/api/sysparms')
    .success(function (result) {

      $scope.email = result.email;
      $scope.round = result.currentRound;
      $scope.month = result.currentMonth;

  $http.get('http://localhost:3000/api/get_table',)
    .success(function (result) {

        $scope.users = result;
        console.log("Here's the gibber" );

    })
    .error(function (data, status) {

        console.log(data);

  });
});
}]);
