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
});
