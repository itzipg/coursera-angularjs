(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItemsTemplate.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];
  list.searchTerm = "";
    
  list.searchMenuItems = function () {
    var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      
    promise.then(function (response) {
      list.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };
    
  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response.then(function(result) {
        var foundItems = [];
        var items = result.data.menu_items;
        
        for (var i in items) {
            
            if (searchTerm != "" && items[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                foundItems.push(items[i]);
                console.log("item found: " + items[i].description)
            }
        }
            
        return foundItems;
    });
  };

}

})();