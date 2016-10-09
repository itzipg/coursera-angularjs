(function() {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {
        name: 'Cookies',
        quantity: 10
      },
      {
        name: 'Beers',
        quantity: 4
      },
      {
        name: 'Chips',
        quantity: 10
      },
      {
        name: 'Granola bars',
        quantity: 5
      },
      {
        name: 'Drinks',
        quantity: 7
      },
      {
        name: 'Milk',
        quantity: 1
      }
    ];
    var alreadyBoughtItems = [];

    service.buyItem = function(itemIndex) {
      var item = toBuyItems.splice(itemIndex, 1)[0];
      alreadyBoughtItems.push(item);
    };

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function() {
      return alreadyBoughtItems;
    };
  }
})();