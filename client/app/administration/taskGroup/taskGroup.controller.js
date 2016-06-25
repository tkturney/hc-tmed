'use strict';

angular.module('helpcard2App')
  .controller('TaskGroupCtrl', function ($rootScope, $scope, $http, $resource, socket) {
    $scope.taskGroups = [];
    $scope.currentTaskGroup = '';
    $scope.newTaskGroup = '';
    $scope.bufferTaskGroup = '';
    $scope.addingTaskGroup = false;
    $scope.editingTaskGroup = false;

    $http.get('/api/taskGroups').success(function(taskGroups) {
      $scope.taskGroups = taskGroups;
      socket.syncUpdates('taskGroup', $scope.taskGroups);
    });

    var refreshTasks = function() {
      $http.get('/api/taskGroups').success(function(taskGroups) {
        $scope.taskGroups = taskGroups;
      });
    };

    $scope.refresh = function() {
      refreshTasks();
    };

    $scope.addTaskGroup = function() {
      $scope.addingTaskGroup = true;
    };

    $scope.cancelAddTaskGroup = function() {
      $scope.addingTaskGroup = false;
      $scope.newTaskGroup = '';
    };

    $scope.createTaskGroup = function() {
      if($scope.newTaskGroup === '') {
        return;
      }
      $scope.newTaskGroup.modifiedBy = 'tkturney';
      // $http.post('/api/taskGroups', { name: $scope.newTaskGroup });
      $http.post('/api/taskGroups', $scope.newTaskGroup);
      setTimeout(function() {
        $scope.currentTaskGroup = $scope.newTaskGroup;
        $scope.newTaskGroup = '';
        $scope.addingTaskGroup = false;
        refreshTasks();
      }, 250);
    };

    $scope.editTaskGroup = function() {
      $scope.editingTaskGroup = true;
    }

    $scope.cancelEditTaskGroup = function() {
      $scope.editingTaskGroup = false;
    }

    $scope.updateTaskGroup = function(taskGroup) {
      taskGroup.modifiedBy = 'tkturney';
      $http.put('/api/taskGroups/' + taskGroup.taskGroupID, taskGroup);
      setTimeout(function() {
        $scope.currentTaskGroup = taskGroup;
        $scope.editingTaskGroup = false;
        //refreshTasks();
      }, 250);
    };

    $scope.deleteTaskGroup = function(taskGroup) {
      $http.delete('/api/taskGroups/' + taskGroup.taskGroupID)
      setTimeout(function() {
        $scope.currentTaskGroup = '';
        refreshTasks();
      }, 250);
    };

    $scope.setCurrentTaskGroup = function(taskGroup) {
      $scope.currentTaskGroup = taskGroup;
      $scope.bufferTaskGroup = taskGroup;
    };

    $scope.showDescription = function(taskGroup) {
        $scope.description = taskGroup.description;
    };

    $scope.$on('$taskGroup:save', function() {
      refreshTasks();
    });

    $scope.$on('$taskGroup:destroy', function() {
      refreshTasks();
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('taskGroup');
    });
  });
