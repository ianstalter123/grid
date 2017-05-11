'use strict';

/**
 * @ngdoc function
 * @name joyGridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the joyGridApp
 */
angular.module('joyGridApp')
  .controller('mainCtrl', function($scope, JoyDB, $timeout) {
    $scope.foodList = [];
    JoyDB.child('foods')
      .on('child_added', function(snap) {
        console.log('here', snap.val());
        $timeout(function() {
          $scope.foodList.push(snap.val());
        })
      })
  });
