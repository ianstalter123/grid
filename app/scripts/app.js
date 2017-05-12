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
  };

  var foodState = {
    name: 'food',
    url: '/food/:foodId',
    templateUrl: 'views/food.html',
    controller: 'foodCtrl'
  };

  $stateProvider.state(mainState);
  $stateProvider.state(foodState);
})

.directive('modalDialog', function() {
    return {
      restrict: 'E',
      scope: {
        show: '=',
        data: '=',
        content: '='
      },
      replace: true, // Replace with the template below
      link: function(scope, element, attrs) {
        console.log(scope);
        scope.current = 0;
        scope.$on('index', function(e, data) {
          console.log('in the index', data);
          scope.current = data;
        });

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
  })
  .directive('slider', function($timeout) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        images: '=',
        data: '=',
        content: '='
      },
      controller: function($scope) {
        console.log($scope)
      },
      link: function(scope, elem, attrs) {
        console.log('slider time', scope);
        scope.currentIndex = 0;

        scope.next = function() {
          scope.currentIndex < scope.data.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
          scope.$emit('index', scope.currentIndex);
        };

        scope.prev = function() {
          scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.data.length - 1;
          scope.$emit('index', scope.currentIndex);
        };

        scope.$watch('currentIndex', function() {
          scope.data.forEach(function(image) {
            image.visible = false;
          });
          scope.data[scope.currentIndex].visible = true;

        })
      },
      templateUrl: 'templates/slider.html'


    };
  });
