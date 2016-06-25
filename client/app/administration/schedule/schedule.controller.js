'use strict';

angular.module('helpcard2App')
  .controller('ScheduleCtrl', function ($rootScope, $scope, $http, $resource, socket) {
    $scope.schedules = [];
    $scope.currentSchedule = '';
    $scope.newSchedule = '';
    $scope.bufferSchedule = '';
    $scope.addingSchedule = false;
    $scope.editingSchedule = false;

    var refreshTasks = function() {
      $http.get('/api/schedules').success(function(schedules) {
        $scope.schedules = schedules;
      });
    };

    refreshTasks();
    socket.syncUpdates('schedule', $scope.schedules);

    $scope.refresh = function() {
      refreshTasks();
    }

    $scope.addSchedule = function() {
      $scope.addingSchedule = true;
    };

    $scope.cancelAddSchedule = function() {
      $scope.addingSchedule = false;
      $scope.newSchedule = '';
    };

    $scope.createSchedule = function() {
      if($scope.newSchedule === '') {
        return;
      }
      $scope.newSchedule.modifiedBy = 'tkturney';
      // $http.post('/api/schedules', { name: $scope.newSchedule });
      $http.post('/api/schedules', $scope.newSchedule);
      setTimeout(function() {
        $scope.currentSchedule = $scope.newSchedule;
        $scope.newSchedule = '';
        $scope.addingSchedule = false;
        refreshTasks();
      }, 250);
    };

    $scope.editSchedule = function() {
      $scope.editingSchedule = true;
    }

    $scope.cancelEditSchedule = function() {
      $scope.editingSchedule = false;
    }

    $scope.updateSchedule = function(schedule) {
      schedule.modifiedBy = 'tkturney';
      $http.put('/api/schedules/' + schedule.scheduleID, schedule);
      setTimeout(function() {
        $scope.currentSchedule = $scope.bufferSchedule;
        $scope.editingSchedule = false;
        refreshTasks();
      }, 250);
    };

    $scope.deleteSchedule = function(schedule) {
      $http.delete('/api/schedules/' + schedule.scheduleID);
      setTimeout(function() {
        $scope.currentSchedule = '';
        refreshTasks();
      }, 250);
    };

    $scope.setCurrentSchedule = function(schedule) {
      $scope.currentSchedule = schedule;
      $scope.bufferSchedule = schedule;
    };

    $scope.showDescription = function(schedule) {
        $scope.description = schedule.description;
    };

    $scope.$on('$schedule:save', function() {
      refreshTasks();
    });

    $scope.$on('$schedule:remove', function() {
      refreshTasks();
    });

    $scope.$on('$destroy:destroy', function () {
      refreshTasks();
      socket.unsyncUpdates('schedule');
    });
  });
