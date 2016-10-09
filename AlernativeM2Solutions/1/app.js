(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.toBuyList = ShoppingListCheckOffService.getItemsToBuy();

    toBuyCtrl.clickOnBuyButton = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

    toBuyCtrl.displayAllBought = function(){
      return toBuyCtrl.toBuyList.length == 0;
    };

  }


  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;
    alreadyBoughtCtrl.alreadyBoughtList = ShoppingListCheckOffService.getBoughtItems();

    alreadyBoughtCtrl.displayNothingBought = function(){
      return alreadyBoughtCtrl.alreadyBoughtList.length == 0;
    };
  }


  function ShoppingListCheckOffService(){
    var service = this;

     var itemsToBuy = [
      {name: "cookies", quantity: 10},
      {name: "milk", quantity: 3},
      {name: "cheetos", quantity: 8},
      {name: "pizza", quantity: 2},
      {name: "pepsi", quantity: 9}
    ];

    var itemsAlreadyBought = [];

    service.getItemsToBuy = function (){
      return itemsToBuy;
    };

    service.getBoughtItems = function (){
      return itemsAlreadyBought;
    };

    service.buyItem = function(index){
      var item = itemsToBuy[index];
      itemsAlreadyBought.push(item);
      itemsToBuy.splice(index, 1);
    };
  }

})();