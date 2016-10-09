(function () {
'use strict';

angular.module('data')
.component('itemsPerCategory', {
  templateUrl: 'src/menu/templates/itemsPerCategory.template.html',
  bindings: {
    items: '<'
  }
});

})();
