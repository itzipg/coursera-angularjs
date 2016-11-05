(function () {

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['info','MenuService','ApiPath'];

function InfoController(info, MenuService, ApiPath) {
  var ctrl = this;
  ctrl.basePath = ApiPath;
  ctrl.info = info;
  console.log(ctrl.info);
}

})();
