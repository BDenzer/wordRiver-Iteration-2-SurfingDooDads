'use strict';

angular.module('WordRiverApp')
  .controller('DashboardCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    $scope.studentsId = [];
    $scope.students = [];

    $scope.getStudentId = function() {
      //console.log("hi there");
      $http.get('/api/users/me').success(function(user) {
        //console.log(user);
        $scope.studentsId = user.studentList;
        console.log($scope.studentsId);
        //console.log($scope.packs);
      });
    };


    function getById(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    }

   /* $scope.getById = function(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    };*/
    $scope.getStudentId();

    $scope.getStudentsFromId = function() {
      $http.get('/api/students').success(function (student) {
        console.log(student);

        console.log($scope.studentsId.length);
        for(var i = 0; i < $scope.studentsId.length; i++){
          $scope.students.push(getById(student, $scope.studentsId[i]));
          console.log($scope.studentsId[i]);
          console.log("test");
        }

      });
    };

    $scope.getStudentsFromId();

    $scope.showdetails = function(group) {
      document.getElementById("studentList").innerHTML = "";
      var words = "";
      for (var i = 0; i < group.students.length; i++) {
        words = words + group.students[i].name + "<br>";

      }
      document.getElementById("studentList").innerHTML = "<u>" + group.groupName  + "</u><br/>" + words;
    }
  });
