(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.message = '';
        $scope.msgColor = '';
        $scope.borderColor = '';

        $scope.checkIfTooMuch = function() {
            var menuArray = $scope.lunchMenu.split(',');
            menuArray = menuArray.filter(function(menu) {
                return menu != '';
            });

            if (menuArray.length === 0) {
                $scope.message = 'Please enter data first';
                $scope.msgColor = 'failure';
            } else if (menuArray.length > 3) {
                $scope.message = 'Too much!';
                $scope.msgColor = 'success';
            } else {
                $scope.message = 'Enjoy!';
                $scope.msgColor = 'success';
            }

            $scope.borderColor = $scope.msgColor+"Border";

        };

    }
})();
