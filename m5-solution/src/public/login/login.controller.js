(function () {

angular.module('public')
.controller('LoginController', LoginController);

LoginController.$inject = ['MenuService'];

function LoginController(MenuService) {
  var login = this;
  login.favFound = false;
  login.querySent = false;
  var user = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    favShortName: '',
    favName: '',
    favDescription: ''
  };

  login.submit = function () {
      MenuService.getDish( login.user.favShortName || "")
      .then(function(response) {
          console.log( "Found: " + login.user.favShortName);
          login.favFound = true;
          login.querySent = true;
          login.user.favName = response.name;
          login.user.favDescription = response.description;
          MenuService.setInfo(login.user);
          return response.data;
      }).catch(function(error) {
          console.log("Not found: "+ login.user.favShortName);
          login.favFound = false;
          login.querySent = true;
          return error;
      });
  };

  login.favFound = function () {
    return login.favFound;
  };
}

})();
