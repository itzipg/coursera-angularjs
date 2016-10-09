(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

// LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.lunch = "";
  $scope.lunchCheckMessage = "";

  $scope.checkLunch = function() {
    $scope.lunchCheckMessage = checkLunch($scope.lunch);
  };

  function checkLunch(lunch) {
    if (lunch == "") {
      return "Please enter data first";
    }
    var re = /\s*,\s*/;
    var items = lunch.split(re).map(function(val) { return val.trim() == ""; });
    var realNumOfItems = items.reduce(function(x, y){ if (y) return x-1; else return x; }, items.length);
    if (realNumOfItems <= 3) {
      return "Enjoy!";
    }
    if (realNumOfItems > 3) {
      return "Too much!";
    }
  };
}

})();
