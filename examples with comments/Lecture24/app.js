(function () {
'use strict';

angular.module('ShoppingListPromiseApp', [])
.controller('ShoppingListController', ShoppingListController)
.service('ShoppingListService', ShoppingListService)
.service('WeightLossFilterService', WeightLossFilterService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    ShoppingListService.addItem(list.itemName, list.itemQuantity);
  }

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
function ShoppingListService($q, WeightLossFilterService) {
  var service = this;

  // List of shopping items
  var items = [];
  //The code is very hard to read, because there are functions inside functions
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise.then(function (response) {
  //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
  //
  /*    This one finally decides what to do, 1st argument is the function to execute
        if the execution ends without errors, and 2nd argument is the function
        to execute if there is any error
  */
  //     nextPromise.then(function (result) {
  //       var item = {
  //         name: name,
  //         quantity: quantity
  //       };
  //       items.push(item);
  //     }, function (errorResponse) {
  //       console.log(errorResponse.message);
  //     });
  //   }, function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };

  //Rewrite to make code cleaner
  // service.addItem = function (name, quantity) {
  //   var promise = WeightLossFilterService.checkName(name);
  //
  //   promise
  //   .then(function (response) {
  // This function returns a promise, so I can pass call the then function on it.
  //     return WeightLossFilterService.checkQuantity(quantity);
  //   })
  //   .then(function (response) {
  //     var item = {
  //       name: name,
  //       quantity: quantity
  //     };
  //     items.push(item);
  //   })//The catch method catches any errors from any of the promises.
  //    //We don't hace to treat the error in each function
  //   .catch(function (errorResponse) {
  //     console.log(errorResponse.message);
  //   });
  // };


//Rewrite to make more efficient.
//If one o f the conditions is not satisfied, there is no need to wait on
//the validation of the other
  service.addItem = function (name, quantity) {
    var namePromise = WeightLossFilterService.checkName(name);
    var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

    //$q.all takes an array of promises, we can call the 'then' method.
    //It will be called when all the promises in the array are resolved.
    //But, if one of them finishes with error, all promises will be cancelled
    //and the 'catch' method will execute.
    $q.all([namePromise, quantityPromise]).
    then(function (response) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    })
    .catch(function (errorResponse) {
      console.log(errorResponse.message);
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


WeightLossFilterService.$inject = ['$q', '$timeout']
function WeightLossFilterService($q, $timeout) {
  var service = this;

  service.checkName = function (name) {
    //Aquire enviroment for asyncronous behaviour
    var deferred = $q.defer();

    var result = {
      message: ""
    };

    //This $timeout function simulates that the processing of the data entered takes
    //some time (so that it make sense to treat it asynchronously)
    $timeout(function () {
      // Check for cookies
      if (name.toLowerCase().indexOf('cookie') === -1) {
        //succesful exit
        deferred.resolve(result)
      }
      else {
        //fault exit
        result.message = "Stay away from cookies, Yaakov!";
        deferred.reject(result);
      }
    }, 3000);

    //When the timeout finishes, return the promise
    return deferred.promise;
  };

  //similar to checkName
  service.checkQuantity = function (quantity) {
    var deferred = $q.defer();
    var result = {
      message: ""
    };

    $timeout(function () {
      // Check for too many boxes
      if (quantity < 6) {
        deferred.resolve(result);
      }
      else {
        result.message = "That's too much, Yaakov!";
        deferred.reject(result);
      }
    }, 1000);

    return deferred.promise;
  };
}

})();
