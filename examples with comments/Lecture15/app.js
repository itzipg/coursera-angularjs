(function () {
'use strict';

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope', '$timeout'];
function CounterController($scope, $timeout) {
  $scope.counter = 0;

    /*If we do this, the counter gets incremented and the log will be printed,
  but the value on the page will not change.
  That is because, by placing the $scope.counter++ inside the setTimeout function,
  it gets taken off the Angular context. That means Angular doesn't know the value
  has changed, and it does not fire the digest cycle to update the DOM.
  We have to call $scope.$digest manually to update the DOM.
  */
  // $scope.upCounter = function () {
  //   setTimeout(function () {
  //     $scope.counter++;
  //     console.log("Counter incremented!");
  //     $scope.$digest();
  //   }, 2000);
  // };
}

/*As an alternative, we can tell Angular that it should check what happens inside
the setTimeout function, by adding $scope.$apply
*/
// $scope.upCounter = function () {
//   setTimeout(function () {
//     $scope.$apply(function () {
//       $scope.counter++;
//       console.log("Counter incremented!");
//     });
//   }, 2000);
// };

/*If we check Angular documentation, we will see that Angular already provides
q function that executes the code after a timeout ($timeout).
Is best to use it, and avoid dirtying the code with $apply*/
$scope.upCounter = function () {
  $timeout(function () {
    $scope.counter++;
    console.log("Counter incremented!");
  }, 2000);
};
})();
