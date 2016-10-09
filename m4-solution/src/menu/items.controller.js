(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['items'];
function ItemsController(items) {
  var list = this;
  console.log(items);
  list.items = items;
  list.categoryName = items.category.name;
  console.log(list.categoryName);
  list.menuItems = items.menu_items;
  console.log(list.menuItems);
}

})();
