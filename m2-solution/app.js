(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyShoppingController', ToDoController)
.controller('AlreadyBoughtShoppingController', DoneController)
.service('ShoppingListCheckOffService', ShoppingListService);

//Controller for first list, inject service
ToDoController.$inject = ["ShoppingListCheckOffService"];
function ToDoController(ShoppingListCheckOffService){
  var toDoList = this;
  toDoList.items = ShoppingListCheckOffService.getItemsToBuy();

  toDoList.buyItem = function (itemIndex){
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

//Controller for second list, inject service
DoneController.$inject = ["ShoppingListCheckOffService"];
function DoneController(ShoppingListCheckOffService){
  var doneList = this;
  doneList.items = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListService() {
  var service = this;
  // List of shopping items
  var itemsToBuy = [{name: 'Rice', quantity: 10},
                    {name: 'Soy sauce', quantity: 1},
                    {name: 'Salmon', quantity: 4},
                    {name: 'Nori sheets', quantity: 5},
                    {name: 'Rice vinegar', quantity: 1},
                    {name: 'Wasabi', quantity: 1}];
  var itemsBought = [];

  //Buy item: get item to remove, remove it from 1st list and add it to 2nd list
  service.buyItem = function (itemIndex) {
    var boughtItem = itemsToBuy[itemIndex];
    itemsToBuy.splice(itemIndex, 1);
    itemsBought.push(boughtItem);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
