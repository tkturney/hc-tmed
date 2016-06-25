'use strict';

angular.module('helpcard2App')
  .controller('TaskCtrl', function ($rootScope, $scope, $http, $resource, socket) {
    $scope.tasks = [];
    $scope.taskGroups = [];
    $scope.selectedGroups = [];
    $scope.currentTask = '';
    $scope.newTask = '';
    $scope.bufferTask = '';
    $scope.addingTask = false;
    $scope.editingTask = false;
    $scope.selectedValues = [];

    $scope.$watch('selectedGroups', function(nowSelected) {
      $scope.selectedValues = [];
      if (!nowSelected) {
        return;
      }

      angular.forEach(nowSelected, function(taskGroupKey) {
        $scope.selectedValues.push(taskGroupKey);
       console.log($scope.selectedValues);
      });
    });

    var refreshTasks = function() {
      $http.get('/api/tasks').success(function(tasks) {
        $scope.tasks = tasks;
      });
    };

    $http.get('/api/taskGroups').success(function(taskGroups) {
      $scope.taskGroups = taskGroups;
    });

    refreshTasks();
    socket.syncUpdates('task', $scope.tasks);

    $scope.refresh = function() {
      refreshTasks();
    }

    $scope.addTask = function() {
      $scope.addingTask = true;
    };

    $scope.cancelAddTask = function() {
      $scope.addingTask = false;
      $scope.newTask = '';
    };

    $scope.createTask = function() {
      if($scope.newTask === '') {
        return;
      }

      $scope.newTask.modifiedBy = 'tkturney';

      // Get the selected groups from the list box
      var taskBundle = {
          task: $scope.newTask,
          taskGroups: $scope.selectedGroups
      };

      $http.post('/api/tasks', taskBundle);
      setTimeout(function() {
        $scope.currentTask = $scope.newTask;
        $scope.newTask = '';
        $scope.selectedGroups = [];
        $scope.addingTask = false;
        refreshTasks();
      }, 250);
    };

    $scope.editTask = function() {
      $scope.editingTask = true;
    }

    $scope.cancelEditTask = function() {
      $scope.editingTask = false;
    }

    $scope.updateTask = function(task) {
      task.modifiedBy = 'tkturney';
      $http.put('/api/tasks/' + task.taskID, task);
      setTimeout(function() {
        $scope.currentTask = task;
        $scope.editingTask = false;
        refreshTasks();
      }, 250);
    };

    $scope.addTaskGroup = function(task, taskGroup) {
      task.addTaskGroup(taskGroup);
    }

    $scope.deleteTask = function(task) {
      $http.delete('/api/tasks/' + task.taskID);
      setTimeout(function() {
        $scope.currentTask = '';
        refreshTasks();
      }, 250);
    };

    $scope.setCurrentTask = function(task) {
      $scope.currentTask = task;
      $scope.bufferTask = task;
    };

    $scope.showDescription = function(task) {
        $scope.description = task.description;
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('task');
    });
  });
