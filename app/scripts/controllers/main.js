'use strict';

/**
 * @ngdoc function
 * @name joyGridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the joyGridApp
 */
angular.module('joyGridApp')
  .controller('mainCtrl', function($scope, JoyDB, $timeout, $firebaseArray, Upload, cloudinary) {

    $scope.foodList = $firebaseArray(JoyDB.child('foods'));

    $scope.options = {};
    $scope.options.cloud_name = 'ianstalter';
    $scope.options.upload_preset = 'i99sp2yt';
    $scope.options.api_key = '';

    $scope.selectFile = function() {
      console.log('here');
      document.querySelector('#fileInput')
        .click();
    }

    $scope.uploadFile = function(file) {
      cloudinary.upload(file[0], $scope.options)

      .success(function(data) {
          console.log(data.url);
          var obj = {};
          obj.url = data.url;
          JoyDB.child('foods')
            .child('mushrooms')
            .child('pictures')
            .push(obj);
          //$scope.foodList['mushrooms'].push(obj);
          //$scope.foodList.$save;
        })
        .error(function(data) {
          console.log(data);
        })
    }

    $scope.upload = function(file) {
      console.log('file', file);
      getBase64(file);
    };

  });
