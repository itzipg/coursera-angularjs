(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.textBox = "";

  $scope.checkLunch = function () {
    var textArray = $scope.textBox.split(/\s*,\s*/);
    var count = 0;
    for (var i = 0; i < textArray.length; i++) {
      if ( textArray[i].length > 0) {
        count++;
      }
    }
    if (count == 0) {
      $scope.message = "Please enter data first";
      $scope.color = "red";
    }
    else if (count < 4) {
      $scope.message = "Enjoy!";
      $scope.color = "green";
    }
    else {
      $scope.message = "Too much!";
      $scope.color = "green";
    }
  };

  $scope.clearAll = function() {
    $scope.textBox = "";
    $scope.message = "";
    $scope.color = "";
  }
};

})();
