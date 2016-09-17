(function () {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.veredict = "";
  $scope.checkDishes = function(){
    var numOfItems = getNumberOfItems($scope.dishes.split([',']));
    if(numOfItems == 0){
      $scope.veredict = "Please enter data first";
    } else if (numOfItems > 3){
      $scope.veredict = "Too much!";
    } else {
      $scope.veredict = "Enjoy!";
    }
  };

  function getNumberOfItems(arrayOfItems){
    var i = 0;
    var total = 0;
    while (i < arrayOfItems.length) {
      if (arrayOfItems[i].trim() != ""){
        total++;
      }
      i++;
    }
    return total;


  }
}

})();
