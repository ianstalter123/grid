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

    $scope.toggleUploadDiv = function() {
      console.log('hello world');
    }

    $scope.upload = function(file) {
      console.log('uploading');
      Upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + cloudinary.config()
            .cloud_name + "/upload",
          data: {
            upload_preset: cloudinary.config()
              .upload_preset,
            tags: 'myphotoalbum',
            context: 'photo',
            file: file
          }
        })
        .then(function(resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function(resp) {
          console.log('Error status: ' + resp.status);
        }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

  });
