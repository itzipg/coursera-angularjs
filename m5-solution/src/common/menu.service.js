(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  var user = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    favShortName: '',
    favName: '',
    favDescription: ''
  };
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getDish = function (shortName) {
    /*var config = {};
    if (shortName) {
      config.params = {'short_name': shortName};
    }*/
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
      return response.data;
    });
  };

  service.setInfo = function (user) {
    service.user = user;
  }

  service.getInfo = function (){
    return service.user;
  }
}



})();
