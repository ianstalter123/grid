'use strict';

/**
 * @ngdoc function
 * @name joyGridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the joyGridApp
 */
angular.module('joyGridApp')
  .controller('mainCtrl', function($scope, JoyDB, $timeout, $firebaseArray) {

    $scope.foodList = $firebaseArray(JoyDB.child('foods'));

    $scope.toggleUploadDiv = function() {
      console.log('hello world');
    }

  });
