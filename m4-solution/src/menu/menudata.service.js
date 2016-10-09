(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Returns a promise with the list of categories
  service.getAllCategories = function () {
    var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
    return response.then(function (result) {
      //console.log(result.data);
      return result.data;
    });
  }


  //Returns a promise with the items in a specific category
  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
      });
    return response.then(function (result) {
      console.log(result.data);
      return result.data;
    });
  }
}

})();
