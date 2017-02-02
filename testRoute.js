angular.module("app",[]
	.controller("PredictionController", ['$scope', function ($scope) {
    $scope.predictions = [
        { home: 'Manchester United', homescore: 0, away: 'Wolves', awayscore: 0 },
        { home: 'Chelsea', homescore: 0, away: 'Manchester City', awayscore: 0 },
        { home: 'Everton', homescore: 0, away: 'Liverpool', awayscore: 0 },
        { home: 'Tottenham Hotspur', homescore: 0, away: 'Arsenal', awayscore: 0 },
        { home: 'Southampton', homescore: 0, away: 'Leicester City', awayscore: 0 },
      ];
  }]);
