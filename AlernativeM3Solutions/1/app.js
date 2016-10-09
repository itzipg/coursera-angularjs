(function () {
'use strict';

angular.module("NarrowItDownApp",[])
.controller("NarrowItDownController",NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive("foundItems",FoundItemsDirective)
.constant("ApiBasePath","https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {

  var ddo = {
    templateUrl: "foundList.html",
    scope: {
      items:'<',
      onRemove:'&'
    },
    controller: "NarrowItDownController",
    controllerAs:"ctrl",
    bindToController:true
  };

  return ddo;

};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

var controller = this;


controller.getMatchedItem = function(searchTerm) {

var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

promise.then(function (response) {
    controller.menuitems = response;
    console.log(response);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

};

controller.removeItem = function(itemIndex) {
console.log("Inside Remove Item controller");
  controller.menuitems = MenuSearchService.removeItem(itemIndex);



};
};

MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath) {

var service = this;
var found = [];

service.getMatchedMenuItems = function(searchTerm) {
  found = [];
 return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
     
    }).then(function(result) {
      if(searchTerm == "undefined" || searchTerm =="")
      {
        return found;
      }
      for(var i = 0; i<result.data.menu_items.length;i++) {
        var obj = result.data.menu_items[i];
      
        if(obj.description.includes(searchTerm))
        {
          found.push(obj);
        }
      }

        return found;
    });
};

service.removeItem = function(itemIndex) {
 
  found.splice(itemIndex,1);
  return found;
};

};




})();