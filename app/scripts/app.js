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

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
})


.directive('modalDialog', function() {
    return {
      restrict: 'E',
      scope: {
        show: '=',
        data: '=',
        content: '=',
        profile: '=',
        index: '='
      },
      replace: true, // Replace with the template below
      link: function(scope, element, attrs) {
        console.log(scope);
        scope.current = 0;
        scope.submitComment = function(id) {
          console.log('submitting comment');
          scope.data[id].comments.push(scope.comment);
          scope.data.$save(id);
          scope.comment = '';
        }
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
  })
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      restrict: 'AE',
      element.bind("keydown keypress", function(event) {
        console.log('inside ngenter');
        if (event.which === 13) {
          console.log('inside enter call');
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  })


.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0)
      .toUpperCase() + input.substr(1)
      .toLowerCase() : '';
  }
});
