'use strict';

angular.module('WordRiverApp')
  .controller('DashboardCtrl', function ($scope, $http, socket) {
/*    $scope.message = 'Hello';

    $scope.studentsId = [];
    $scope.groups = [];
    $scope.students = [];

    $scope.getStudentId = function() {
      //console.log("hi there");
      $http.get('/api/users/me').success(function(user) {
        //console.log(user);
        $scope.studentsId = user.studentList;
        $scope.studentsId = user.studentGroups;
        console.log($scope.studentsId);
        //console.log($scope.packs);
      });
    };

    $scope.getStudentId();

    function getById(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    }

   *//* $scope.getById = function(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    };*//*
    *//*$scope.getStudentId();*//*

    $scope.getStudentsFromId = function() {
      $http.get('/api/students').success(function (student) {
        console.log(student);

        console.log($scope.studentsId.length);
        for(var i = 0; i < $scope.studentsId.length; i++){
          $scope.students.push(getById(student, $scope.studentsId[i]));
          console.log($scope.studentsId[i]);
          console.log("test");
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
    }*/


    $scope.studentList = [];
    $scope.studentGroups = [];
    $scope.userId = "";
    $scope.contextPacks = [];

    $scope.textField = "";
    $scope.tileField = "";


    $scope.showGroup = false;
    $scope.currentGroup = null;

    $scope.showPack = false;
    $scope.currentPack = null;
    $scope.showTileAdder = false;

    $scope.getPacks = function () {
      $http.get('/api/users/me').success(function (user) {
        $scope.contextPacks = $scope.parsePack(user);
        $scope.userId = user._id;
        $scope.studentGroups = user.studentGroups;
        $scope.studentList = user.studentList;

        //socket.syncUpdates('pack', $scope.contextPacks);
      }).success(function(){
        $scope.getStudents();
      });
    };

    $scope.parsePack = function (contextPack) {
      var data = [];
      for (var i = 0; i < contextPack.tileTags.length; i++) {
        data.push({packName: contextPack.tileTags[i].tagName, tiles: [], _id: contextPack.tileTags[i]._id, highlighted: ""});
      }

      for (var j = 0; j < contextPack.tileBucket.length; j++) {
        var ids = $scope.idInArray(data, contextPack.tileBucket[j].tileTags);
        if (ids.result) {
          for (var k = 0; k < ids.index.length; k++) {
            data[ids.index[k]].tiles.push(contextPack.tileBucket[j]);
          }
        }
      }
      //console.log(data[0].tiles[0].wordName);
      return data;
    };

    $scope.getGroupData = function(index) {
      var result = {};
      var result2 = {};
      result = $scope.idInArray($scope.contextPacks, $scope.studentGroups[index].contextPacks);
      for(var k = 0; k < $scope.contextPacks.length; k++){
        $scope.contextPacks[k].highlighted =  "";
      }
      for(var l = 0; l < $scope.studentList.length; l++){
        $scope.studentList[l].highlighted =  "";
      }
      for(var m = 0; m < $scope.studentGroups.length; m++){
        $scope.studentGroups[m].highlighted =  "";
      }
      $scope.studentGroups[index].highlighted = "highlighted";
      if (result.result) {
        for (var i = 0; i < result.index.length; i++) {
          $scope.contextPacks[result.index[i]].highlighted =  "highlighted";
        }
      }
      console.log($scope.studentList[0]._id);
      var groupIds = [];
      for(var i = 0; i < $scope.studentGroups[index].students.length; i++){
        groupIds.push($scope.studentGroups[index].students[i]._id);
      }
      result2 = $scope.idInArray($scope.studentList, groupIds);
      if (result2.result) {
        for (var j = 0; j < result2.index.length; j++) {
          $scope.studentList[result2.index[j]].highlighted = "highlighted";
        }
      }

    };

    $scope.idInArray = function (array, tileTags) {
      var result = false;
      var indexes = [];
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < tileTags.length; j++) {
          //console.log(array[i]._id + " " + tileTags[j]);
          if (array[i]._id == tileTags[j]) {
            result = true;
            indexes.push(i);
          }
        }
      }
      return {result: result, index: indexes};
    };
    $scope.getPacks();

    $scope.getStudents = function () {
      $http.get('/api/students').success(function (studentList) {
        console.log(studentList);
        $scope.getMyGroups(studentList);
        var result = $scope.idInArray(studentList, $scope.studentList);
        $scope.studentList.splice(0, $scope.studentList.length);
        for (var i = 0; i < result.index.length; i++) {
          $scope.studentList.push(studentList[result.index[i]]);
        }
        //socket.syncUpdates('student', $scope.studentList);

      });
    };

    $scope.getMyGroups = function(studentList){
      var students = [];
      var result = {};
      for(var i = 0; i < $scope.studentGroups.length; i++){
        $scope.studentGroups[i].highlighted = "";
        students = [];
        for(var j = 0; j < studentList.length; j++){
          result = $scope.inArray($scope.studentGroups[i].students, studentList[j]._id);
          if(result.result){
            studentList[j].highlighted = "";
            students.push(studentList[j]);
          }
        }
        $scope.studentGroups[i].students = students;
      }
    };

    $scope.arrayCleanUp = function(array){
      var cleanArray = [];
      for(var i = 0; i < array.length; i++){
        if(array[i]){
          cleanArray.push(array[i]);
        }
      }

      return cleanArray;
    };



    $scope.deletePack = function(index) {
      $http.put('/api/users/' + $scope.userId + "/deletePack", {index: index});

      $scope.contextPacks.splice(index, 1);
    };

    //$scope.deleteTile = function(pack,index) {
    //  return pack.splice(index, 1);
    //};

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('pack');
    });

    $scope.addContextPacks = function () {
      if ($scope.textField.length >= 1) {
        $http.put('/api/users/' + $scope.userId + "/updatePack", {tagName: $scope.textField, packType: "context"});
        $scope.contextPacks.push({packName: $scope.textField, tiles: []});
      }
      $scope.textField="";
    };

    $scope.addGroup = function () {
      if ($scope.textField.length >= 1) {
        $http.put('/api/users/' + $scope.userId + "/updateGroup", {groupName: $scope.textField});
        $scope.studentGroups.push({groupName: $scope.textField, students: []});
      }
      $scope.textField="";
    };

    $scope.addStudent = function() {
      if ($scope.tileField.length >= 1) {
        $scope.currentGroup.students.push({wordName: $scope.tileField});

        $http.put('/api/users/' + $scope.userId + "/updateGroup", {word: $scope.tileField, packId: $scope.currentPack._id});

        //$http.post('/api/packs', {packName: $scope.currentPack.packName, tiles: $scope.currentPack.tiles});
        //$http.delete('/api/packs/' + $scope.currentPack._id);
        $scope.tileField = "";

      }
    };

    $scope.addTile = function() {
      if ($scope.tileField.length >= 1) {
        $scope.currentPack.tiles.push({wordName: $scope.tileField});

        $http.put('/api/users/' + $scope.userId + "/updateTile", {word: $scope.tileField, packId: $scope.currentPack._id});

        //$http.post('/api/packs', {packName: $scope.currentPack.packName, tiles: $scope.currentPack.tiles});
        //$http.delete('/api/packs/' + $scope.currentPack._id);
        $scope.tileField = "";

      }
    };

    $scope.deleteTile = function(pack, index) {
      console.log(pack);
      $http.put('/api/users/' + $scope.userId + "/deleteTile", {word: pack.tiles[index].wordName, packId: pack._id});
      pack.tiles.splice(index, 1);
      //$http.post('/api/packs', {packName: pack.packName, tiles: pack.tiles});
      //$http.delete('/api/packs/' + pack._id);
    };

    $scope.getPackIndex = function(pack){
      for(var i = 0; i < $scope.contextPacks.length; i++){
        if($scope.contextPacks[i]._id == pack._id){
          return i;
        }
      }
    };

    $scope.toggleShowAdder = function() {
      $scope.showTileAdder = !$scope.showTileAdder;
    };

    $scope.packInfo = function(pack){
      $scope.showPack = true;
      $scope.currentPack = pack;
    };

    $scope.groupInfo = function(group){
      $scope.showGroup = true;
      $scope.currentGroup = group;
    }

    $scope.inArray = function(array, toFind){
      for(var i = 0; i < array.length; i++){
        if(array[i] == toFind){
          return {result: true, index: i};
        }
      }
      return {result: false, index: -1};
    }


  });
