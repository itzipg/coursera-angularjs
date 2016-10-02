(function () {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

//CONTROLLER
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.keyword = "";
  menu.found = [];
  menu.narrowItDown = function (searchTerm) {
    if(searchTerm != ""){
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        menu.found = response;
        console.log("You may want: ", menu.found);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  };

  menu.removeItem = function (itemIndex) {
    console.log("Remove :", itemIndex);
    menu.found.splice(itemIndex, 1);
  };

  menu.emptyList = function () {
    return (menu.found.lenght <= 0);
  };
}

//DIRECTIVE
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      items:'<foundItems',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'dirCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {

}


//SERVICE
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response.then(function (result) {
      // process result and only keep items that match
      //console.log(result.data);
      //result.data is an array of menu_items
      var allMenuItems = result.data.menu_items;
      var foundItems = [];
      var i = 0;
      while (i < allMenuItems.length) {
        if (allMenuItems[i].description.indexOf(searchTerm) != -1){
          //add item if matching searchTerm
          //console.log(allMenuItems[i].description);
          foundItems.push(allMenuItems[i]);
        }
        i++;
      }
      //console.log(foundItems);
      // return processed items
      return foundItems;
    });
  }
}

})();
