// DIRECTIVES
predictionApp.directive("userSummary", function() {
   return {
       restrict: 'E',
       templateUrl: 'public/directives/userSummary.html',
       replace: true,
       scope: {
            user: "=",
            round: "="
       }
   }
});

predictionApp.directive("predictionList", function() {
   return {
       restrict: 'E',
       templateUrl: 'public/directives/predictionList.html',
       replace: true,
       scope: {
           email: "=",
           round: "=",
           predictions: "="
       }
   }
});

predictionApp.directive("predictionTable", function() {
   return {
       restrict: 'E',
       templateUrl: 'public/directives/predictionTable.html',
       replace: true,
       scope: {
           email: "="
      }
   }
});
