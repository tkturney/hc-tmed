'use strict';

describe('Controller: TaskCtrl', function () {

  // load the controller's module
  beforeEach(module('helpcard2App'));
  beforeEach(module('socketMock'));

  var TaskCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/taskGroups')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('TaskCtrl', {
      $scope: scope
    });
  }));

//   it('should attach a list of things to the scope', function () {
//     $httpBackend.flush();
//     expect(scope.taskGroups.length).toBe(4);
//   });
});
