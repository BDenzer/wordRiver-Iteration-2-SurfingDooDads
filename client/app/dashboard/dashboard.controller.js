'use strict';

angular.module('WordRiverApp')
  .controller('DashboardCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $scope.studentsId = [];
    $scope.students = [];

    $scope.getStudentId = function() {
      $http.get('/api/users/me').success(function(user) {
        console.log(user);
        $scope.studentsId = user.studentGroups;
        console.log($scope.packs);
      });
    };

    $scope.getStudentsFromId = function() {
      $http.get('/api/students').success(function (student) {
        for(var i = 0; $scope.studentsId.length; i++){
          $scope.students.add(student.findById($scope.studentsId[i]));
        }
      });
    };

    $scope.showdetails = function(group) {
      document.getElementById("studentList").innerHTML = "";
      var words = "";
      for (var i = 0; i < group.students.length; i++) {
        words = words + group.students[i].name + "<br>";

      }
      document.getElementById("studentList").innerHTML = "<u>" + group.groupName  + "</u><br/>" + words;
    }
  });
