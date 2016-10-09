(function () {
'use strict';

angular.module('data')
.component('categoriesList', {
  templateUrl: 'src/menu/templates/categoriesList.template.html',
  bindings: {
    categories: '<'
  }
});

})();
