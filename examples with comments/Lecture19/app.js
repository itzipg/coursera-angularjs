(function () {
'use strict';

//
angular.module('ControllerAsApp', [])
.controller('ParentController1', ParentController1)
.controller('ChildController1', ChildController1)
.controller('ParentController2', ParentController2)
.controller('ChildController2', ChildController2);

// ** Without controller As syntax
ParentController1.$inject = ['$scope'];
function ParentController1($scope) {
  $scope.parentValue = 1;
  $scope.pc = this;
  $scope.pc.parentValue = 1;
}


ChildController1.$inject = ['$scope'];
function ChildController1($scope) {
  // console.log("$scope.parentValue: ", $scope.parentValue);
  // console.log("CHILD $scope: ", $scope);
  //
  // $scope.parentValue = 5;
  // console.log("*** CHANGED: $scope.parentValue = 5 ***");
  // console.log("$scope.parentValue: ", $scope.parentValue);
  // console.log($scope);
  //
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue)
  // $scope.pc.parentValue = 5;
  // console.log("** CHANGED: $scope.pc.parentValue = 5; ***");
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue)
  // console.log("$scope: ", $scope);
  //
  // console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
}

// ** With controller As syntax
function ParentController2() {
  //This is good practice, to name the this object as the label, so the code
  //is easier to read, instead of putting references to "this" everywhere
  var parent = this;
  //We don't need the scope, because we attach the properties directly to the
  //instance of the ParentController2
  parent.value = 1;
}
/*There is no need to inject the $scope any longer, here it's only injected to
console.log the $scope*/
ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
  var child = this;
  child.value = 5;
  console.log("ChildController2 $scope: ", $scope);
}

})();
