(function () {
'use strict';

angular.module('data')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['categoriesMenu'];
function CategoriesListController(categoriesMenu) {
  var list = this;
  //console.log(categoriesMenu);
  list.items = categoriesMenu;
}

})();
