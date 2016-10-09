(function () {
  'use strict';

  angular.module("ShoppingList", [])
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject=["ShoppingListCheckOffService"];
  function ToBuyShoppingController(ShoppingListCheckOffService){
    var toBuyController = this;
    toBuyController.getList = function(){
      return ShoppingListCheckOffService.getToBuyList();
    }

    toBuyController.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    }

    toBuyController.pendingProducts = function(){
      return ShoppingListCheckOffService.arePendingProducts();
    }
  };


  AlreadyBoughtShoppingController.$inject=["ShoppingListCheckOffService"];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var boughtController = this;
    boughtController.getList = function(){
      return ShoppingListCheckOffService.getBoughtList();
    }

    boughtController.areSomethingBought = function(){
      return ShoppingListCheckOffService.areSomethingBought();
    }
  };


  function ShoppingListCheckOffService(){
    var service = this;
    var toBuy = [{name:"cookies", quantity:3}, {name:"beers", quantity:20},
                 {name:"bread", quantity:1}, {name:"milk", quantity:3},
                 {name:"cucumbers", quantity:2}
                ];
    var bought = [];

    service.arePendingProducts=function(){
      return toBuy.length >0;
    }

    service.areSomethingBought=function(){
      return bought.length >0;
    }

    service.getToBuyList =function(){
      return toBuy;
    }

    service.getBoughtList=function(){
      return bought;
    }

    service.buyItem =function(itemIndex){
      var product = toBuy[itemIndex];
      toBuy.splice(itemIndex, 1);
      bought.push(product);
    }
  }
})();