'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('testing totalClasses function', function () {
    scope.students.push({class: 'Kindergarten'});
    scope.students.push({class: 'First Grade'});
    scope.students.push({class: 'Second Grade'});
    scope.students.push({class: 'First Grade'});
    scope.students.push({class: 'Kindergarten'});
    scope.students.push({class: 'Second Grade'});
    scope.students.push({class: 'First Grade'});
    scope.totalClasses();
    expect(scope.classList.length).toBe(3);
  });

  it('testing populateStudentArray function', function () {
    scope.students.push({class: 'Kindergarten', firstName: 'Joe', lastName: 'Chelmo'});
    scope.students.push({class: 'First Grade', firstName: 'John', lastName: 'Chelmo'});
    scope.students.push({class: 'Second Grade', firstName: 'Katy', lastName: 'Chelmo'});
    scope.students.push({class: 'First Grade', firstName: 'Phil', lastName: 'Chelmo'});
    scope.students.push({class: 'Kindergarten', firstName: 'Allisa', lastName: 'Chelmo'});
    scope.students.push({class: 'Second Grade', firstName: 'Alexis', lastName: 'Chelmo'});
    scope.students.push({class: 'First Grade', firstName: 'Beyonce', lastName: 'Chelmo'});
    scope.classList.push('Kindergarten', 'First Grade', 'Second Grade');
    scope.populateStudentArray();
    expect(scope.studentList.length).toBe(7);
    expect(scope.studentList[0].student).toBe("Joe Chelmo");
  });

  it('testing changeFilter function', function () {
    scope.filterText = 'puppies';
    scope.changeFilter('cats');
    expect(scope.filterText).toBe('cats');
  });
});
