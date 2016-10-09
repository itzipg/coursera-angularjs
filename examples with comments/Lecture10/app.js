(function () {
'use strict';

angular.module('DIApp', [])
.controller('DIController', DIController);
/*JS are usually minified (that is, processed to remove innecesary characters so that
they are ligther files). If we minify out previous js, they wouldn't work because
$scope and $filter would be replaced by shorter variable names (i.e 'n' and 'm').
We could do:
 .controller('DIController',['$scope', '$filter', DIController]);
The array indicates that the first 2 element are the arguments of the last one,
the function DIController.
We could even define the DIController function as an
inline function inside the array:
 .controller('DIController',['$scope', '$filter', function($scope, $filter){...}]);
These alternatives are not very easy to read.
*/
/*The option implemented in this js improves readbility. The controller
definition stays the same, but we attach a new property to the controller to
inject the arguments ($inject).
When angular processes the controller and its function (DIController), it
will check to see if it has the $inject property, and it will know which services
($scope, $filter) it has to inject into wich argument*/
DIController.$inject = ['$scope', '$filter'];
function DIController($scope, $filter) {
  $scope.name = "Yaakov";

  $scope.upper = function () {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  };
}

})();
