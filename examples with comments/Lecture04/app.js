//(code)();->IIFE, an immediately invoked function expression
//We place that to avoid that any local variables bleed into the global scope
(function () {
//This line enforces strict syntax, for example, will throw an error if we
//define any variables without the var declaration.
'use strict';
//Like x = "Hello"; should be var x = "Hello";
//angular is an object that the angular.js library exposes on the global scope
//module allows to define a new module, in this case our app
//module(nameOfApp, dependencies[])
angular.module('myFirstApp', [])

.controller('MyFirstController', function () {
//the controller function defines the viewModel of our view.
//controller(nameOfViewModel/Controller, functionThatContainsTheFunctionalityOfController)
});

})();
