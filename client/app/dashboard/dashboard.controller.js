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

    $scope.getStudentId();

   /* function getById(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    }*/

    $scope.getById = function(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    }

    $scope.getStudentsFromId = function() {
      $http.get('/api/students').success(function (student) {
        console.log(student);
        /*for(var i = 0; i < $scope.studentsId.length; i++){
           //$scope.students.push(student.findById($scope.studentsId[i]));
          *//*for(var j = 0; j < students.length; j++){
            if($scope.studentsId[i] == student[j]._id){
              $scope.students.add(student[j]);
            }
          }*//*
          $scope.students.push(_.findWhere(student,{_id: $scope.studentsId[i]}));
        }*/
        for(var i = 0; i < $scope.studentsId; i++){
          $scope.students.push(getById(student, studentsId[i]));
        }

        console.log($scope.students);
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
