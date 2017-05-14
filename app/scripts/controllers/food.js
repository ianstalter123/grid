'use strict';

/**
 * @ngdoc function
 * @name joyGridApp.controller:FoodCtrl
 * @description
 * # foodCtrl
 * Controller of the joyGridApp
 */
angular.module('joyGridApp')
  .controller('foodCtrl', function($scope, $firebaseArray, JoyDB, $http, $stateParams) {

    $scope.food = $stateParams.foodId;
    $scope.images = $firebaseArray(JoyDB.child('foods')
      .child($scope.food)
      .child('pictures'));

    var loadUser = function() {

      $http.get('https://randomuser.me/api/')
        .then(function(result) {
          console.log(result);
          $scope.user = result;
        })
    };
    loadUser();

    var loadContent = function(length) {
      console.log('loading');
      for (var i = 0; i < length; i++) {
        $http.get('https://baconipsum.com/api/?type=vegetables-and-filler&paras=1&format=text')
          .then(function(result) {
            console.log(result, $scope.content);
            $scope.content.push(result.data);
          })
      }
    }

    $scope.images.$loaded()
      .then(function(images) {
        var length = images.length;
        console.log('length', length);
        loadContent(length);
      })

    $scope.content = [];


    //console.log('food', food);
    $scope.modalShown = false;
    $scope.toggleModal = function(index) {
      $scope.index = index;
      $scope.modalShown = !$scope.modalShown;
    };
  });
