'use strict';

angular.module('WordRiverApp')
  .controller('OverviewCtrl', function ($scope, $http, socket) {
    $scope.studentList = [];
    $scope.userId = "";
    $scope.contextPacks = [];

    $scope.textField = "";
    $scope.tileField = "";

    $scope.showPack = false;
    $scope.currentPack = null;
    $scope.showTileAdder = false;

    $scope.getPacks = function() {
      $http.get('/api/users/me').success(function (user) {
        $scope.contextPacks = $scope.parsePack(user);
        $scope.userId = user._id;
        $scope.studentList = user.studentGroups;
        //socket.syncUpdates('pack', $scope.contextPacks);
      });
    };

    $scope.parsePack = function(contextPack){
      var data = [];
      for(var i = 0; i < contextPack.tileTags.length; i++){
        data.push({packName: contextPack.tileTags[i].tagName, tiles: [], _id: contextPack.tileTags[i]._id});
      }

      for(var j = 0; j < contextPack.tileBucket.length; j++){
        var ids = $scope.idInArray(data ,contextPack.tileBucket[j].tileTags);
        if(ids.result){
          for(var k = 0; k < ids.index.length; k++){
            data[ids.index[k]].tiles.push(contextPack.tileBucket[j]);
          }
        }
      }
      //console.log(data[0].tiles[0].wordName);
      return data;
    };

    $scope.idInArray = function(array, tileTags){
      var result = false;
      var indexes = [];
      for(var i = 0; i < array.length; i++){
        for(var j = 0; j < tileTags.length; j++)
          if(array[i]._id == tileTags[j]){
            result = true;
            indexes.push(i);
          }
      }
      return {result: result, index: indexes};
    };
    $scope.getPacks();

    $http.get('/api/students').success(function(studentList) {
      $scope.studentList = $scope.getMyStudents(studentList);
      socket.syncUpdates('student', $scope.studentList);
    });

    $scope.getMyStudents = function(studentList){
      var newList = [];
      var result = {};
      for(var i = 0; i < studentList.length; i++){
        for(var j = 0; j < $scope.studentList.length; j++){
          result = $scope.inArray($scope.studentList[j].students, studentList[i]._id);
          if(result.result){
            $scope.studentList[j].students[result.index] = studentList[i];
          }
        }
      }
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

    $scope.inArray = function(array, toFind){
      for(var i = 0; i < array.length; i++){
        if(array[i] == toFind){
          return {result: true, index: i};
        }
      }
      return {result: false, index: -1};
    }
  });
