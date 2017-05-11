'use strict';

/**
 * @ngdoc function
 * @name joyGridApp.controller:FoodCtrl
 * @description
 * # foodCtrl
 * Controller of the joyGridApp
 */
angular.module('joyGridApp')
  .controller('foodCtrl', function($scope, JoyDB, $timeout, $stateParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.food = $stateParams.foodId;
    //console.log('food', food);
    $scope.modalShown = false;
    $scope.toggleModal = function() {
      $scope.modalShown = !$scope.modalShown;
    };
  });
