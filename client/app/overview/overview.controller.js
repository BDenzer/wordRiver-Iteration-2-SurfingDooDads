'use strict';

angular.module('WordRiverApp')
  .controller('OverviewCtrl', function ($scope, $http, socket) {
    $scope.studentList = [];

    $scope.contextPacks = [];

    $scope.textField = "";
    $scope.tileField = "";
    $scope.tileType= "";

    $scope.showPack = false;
    $scope.currentPack = null;
    $scope.showTileAdder = false;

    $scope.getPacks = function() {
      $http.get('/api/users/me').success(function (user) {
        $scope.contextPacks = $scope.parsePack(user);
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
      }
    $scope.getPacks();

    $http.get('/api/students').success(function(studentList) {
      $scope.studentList = studentList;
      socket.syncUpdates('student', $scope.studentList);
    });


    $scope.deletePack = function(index) {
      $http.delete('/api/packs/' + $scope.contextPacks[index]._id);
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
        $http.post('/api/packs', {packName: $scope.textField, tiles: []});
        $scope.contextPacks.push({packName: $scope.textField, tiles: []});
      }
      $scope.textField="";
    };

    $scope.addTile = function() {
      if ($scope.tileField.length >= 1 && $scope.tileType.length > 0) {
        $scope.currentPack.tiles.push({word: $scope.tileField, type: $scope.tileType});

        $http.patch('/api/packs/' + $scope.currentPack._id,
          {tiles: $scope.currentPack.tiles}
        ).success(function(){
            console.log("Patch completed!");
            console.log($scope.contextPacks);
          });

        //$http.post('/api/packs', {packName: $scope.currentPack.packName, tiles: $scope.currentPack.tiles});
        //$http.delete('/api/packs/' + $scope.currentPack._id);
        $scope.tileField = "";

      }
    };

    $scope.deleteTile = function(pack, index) {
      pack.tiles.splice(index, 1);
      $http.patch('/api/packs/' + pack._id,
        {tiles: pack.tiles}
      ).success(function() {
          console.log("Patch completed!");
          console.log($scope.contextPacks);
        });
      //$http.post('/api/packs', {packName: pack.packName, tiles: pack.tiles});
      //$http.delete('/api/packs/' + pack._id);
    };

    $scope.toggleShowAdder = function() {
      $scope.showTileAdder = !$scope.showTileAdder;
    };

    $scope.packInfo = function(pack){
      $scope.showPack = true;
      $scope.currentPack = pack;
    };
  });
