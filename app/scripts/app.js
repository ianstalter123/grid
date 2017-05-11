'use strict';

/**
 * @ngdoc overview
 * @name joyGridApp
 * @description
 * # joyGridApp
 *
 * Main module of the application.
 */
angular
  .module('joyGridApp', [
    'config',
    'services',
    'firebase',
    'ngAnimate',
    'ui.router'
  ])

.config(function($stateProvider) {
  var mainState = {
    name: 'main',
    url: '/main',
    templateUrl: 'views/main.html',
    controller: 'mainCtrl'
  }

  var foodState = {
    name: 'food',
    url: '/food/:foodId',
    templateUrl: 'views/food.html',
    controller: 'foodCtrl'
  }

  $stateProvider.state(mainState);
  $stateProvider.state(foodState);
})

.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'templates/modal.html' // See below
  };
});
