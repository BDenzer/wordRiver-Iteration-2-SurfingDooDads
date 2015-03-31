'use strict';

angular.module('WordRiverApp')
  .controller('TileBucketCtrl', function ($scope, $http, socket) {

    $scope.tileBucket = [];
    $scope.tileTags = [];

    $scope.getTileBucket = function() {
      $http.get('/api/users/me').success(function(user) {
        console.log('We got a user!!');
        $scope.tileBucket = user.tileBucket;
        $scope.tileTags = user.tileTags;
        console.log($scope.tileBucket);
        //socket.syncUpdates('student', $scope.students);
      });
    };
    $scope.getTileBucket();

    $scope.displayImage = function(tile) {
        document.getElementById("Image").innerHTML = "<u>" + "<img src=\"" + tile.img +"\"" + "alt=\"This tile does not have an image\" align=\"middle\" height=\"450\" width=\"450\">" + "</u><br/>";
    };

    function getById(arr, id) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id === id) {
          return arr[i];
        }
      }
    }

    $scope.displayContext = function(tile) {
      for(var i = 0; i < tile.tileTags.length; i++){
        if(getById($scope.tileTags, tile.tileTags[i]).tagType == "Context"){
          return  getById($scope.tileTags, tile.tileTags[i]).tagName + ", ";
        }
      }
    };

    $scope.displayWordType = function(tile) {
      for(var i = 0; i < tile.tileTags.length; i++){
        if(getById($scope.tileTags, tile.tileTags[i]).tagType == "WordType"){
          return  getById($scope.tileTags, tile.tileTags[i]).tagName + ", ";
        }
      }
    };

    $scope.displayOtherTags = function(tile) {
      for(var i = 0; i < tile.tileTags.length; i++){
        if(getById($scope.tileTags, tile.tileTags[i]).tagType == "OtherTags"){
          return  getById($scope.tileTags, tile.tileTags[i]).tagName + ", ";
        }
      }
    }
  });

