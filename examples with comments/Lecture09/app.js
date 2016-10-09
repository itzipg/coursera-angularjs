(function () {
'use strict';
/*Here the function is defined outside the declaration od the controller.
We refer to it in the second parameter of the controller declaration*/
angular.module('DIApp', [])
.controller('DIController', DIController);

/*Since we want to use the functions of the filter service, we pass refer to it
in the declaration of the function controller.
The filter service us create filtering functions that are used for formatting
the data that eventually gets displayed to the user. */
function DIController ($scope,
                       $filter,
                       $injector) {
  $scope.name = "Yaakov";

  /*Here we define a function (upper) in our scope.
  we declare a var upCase that it's really the function 'uppercase' of the filter service.
  And then we use that function to change the name value to uppercase */
  $scope.upper = function () {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  };

  console.log($injector.annotate(DIController));
}

function AnnonateMe(name, job, blah) {
  return "Blah!";
}

console.log(DIController.toString());

})();
