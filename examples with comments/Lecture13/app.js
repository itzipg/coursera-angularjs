(function () {
'use strict';
/*To be able to use our custom filters, we have to register them in our application.
The way to do it is to name the filter (ie, loves or truth), and then specify
the filter factory that creates that filter*/
angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

/*Another step to be able to use our custom filter is to inject them in the controller
(like we injected $filter to use angular predefined filters.).
We already registered out filter factory in the application, and we named
the filters (loves and truth). Angular attaches 'Filter' to that name, so the way to
refer to our filter function is by using lovesFilter o truthFilter.
Note that we are directly injecting the filter function, no the filter service.
That's why we can simply call the function when we want to use the filter*/
MsgController.$inject = ['$scope', 'lovesFilter'];
function MsgController($scope, lovesFilter) {
  $scope.stateOfBeing = "hungry";

  $scope.sayMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    return msg;
  };

  $scope.sayLovesMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    msg = lovesFilter(msg);
    return msg;
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}
/*These 2 functions are filter factory functions, they create and return
our custom filter functions*/
function LovesFilter() {
  return function (input) {
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
}
//The filter created by this filter factory takes 2 extra parameters, apart from
//the input we want to apply the filter on.
function TruthFilter() {
  return function (input, target, replace) {
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}

})();
