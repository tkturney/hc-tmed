'use strict';

angular.module('helpcard2App')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Task Management',
      'link': '/taskManagement'
    },
    {
      'title': 'Employee Development',
      'link': '/resourceDevelopment'
    },
    {
      'title': 'Administration',
      'link': '/administration'
    }];

    $scope.isCollapsed = true;
    $scope.loggedIn = false;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.signIn = function(){
      $scope.loggedIn = true;
    }

    $scope.logout = function() {
      $scope.loggedIn = false;
    }

    $scope.isLoggedIn = function() {
      return $scope.loggedIn;
    }

  });