'use strict';

angular.module('helpcard2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/resource', {
        templateUrl: 'app/administration/resource/resource.html',
        controller: 'ResourceCtrl'
      })
      .when('/schedule', {
        templateUrl: 'app/administration/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      })
      .when('/task', {
        templateUrl: 'app/administration/task/task.html',
        controller: 'TaskCtrl'
      })
      .when('/taskGroup', {
        templateUrl: 'app/administration/taskGroup/taskGroup.html',
        controller: 'TaskGroupCtrl'
      });
  });