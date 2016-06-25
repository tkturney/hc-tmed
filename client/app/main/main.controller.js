'use strict';

angular.module('helpcard2App')
  .controller('MainCtrl', function ($scope, $timeout, $http, socket) {
    $scope.awesomeThings = [];
    $scope.format = 'EEEE, MMMM d, y h:mm a';
    $scope.dateVal = new Date();

    var update = function() {
    $scope.dateVal = new Date();
    $timeout(update, 60000);
  }
  $timeout(update, 60000);

  $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
