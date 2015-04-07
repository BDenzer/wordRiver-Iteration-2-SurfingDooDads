'use strict';

angular.module('WordRiverApp')
  .controller('TileBucketCtrl', function ($scope, $http, socket) {

    $scope.tileBucket = [];
    $scope.tileTags = [];

    $scope.getTileBucket = function() {
      $http.get('/api/users/me').success(function(user) {
        $scope.tileBucket = user.tileBucket;
        $scope.tileTags = user.tileTags;
        //socket.syncUpdates('student', $scope.students);
      });
    };
    $scope.getTileBucket();

    /*$scope.generateButton = function(tile) {
      if(tile.img != null){
        document.getElementById("Button").innerhtml =  "<button ng-click="/"displayImage(tile)/"> + "{{tile.wordName}}" + "</button> ";
    } else{
        document.getElementById("Button").innerhtml =  "data-ng-bind=" + "tile.wordName";
      }
    };*/


    $scope.displayImage = function(tile) {
        document.getElementById("Image").innerHTML = "<u>" + "<img src=\"" + tile.img +"\"" + "alt=\"This tile does not have an image\" align=\"middle\" height=\"450\" width=\"450\">" + "</u><br/>";
    };

    $scope.getById = function(arr,id) {
      var tags = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]._id == id) {
          tags.push(arr[i]);
        }
      }
      return tags;
    };

    $scope.displayContext = function(tile) {
      var toReturn = "";
      var tags = [];
      for(var i = 0; i < tile.tileTags.length; i++){
        tags = $scope.getById($scope.tileTags, tile.tileTags[i]);
        for(var j = 0; j < tags.length; j++){
          if(tags[j].tagType == "Context") {
            toReturn += tags[j].tagName + ", ";
          }
        }
      }
      return toReturn.substring(0, toReturn.length - ", ".length);
    };

    $scope.displayWordType = function(tile) {
      var toReturn = "";
      var tags = [];
      for(var i = 0; i < tile.tileTags.length; i++){
        tags = $scope.getById($scope.tileTags, tile.tileTags[i]);
        for(var j = 0; j < tags.length; j++){
          if(tags[j].tagType == "WordType") {
            toReturn += tags[j].tagName + ", ";
          }
        }
      }
      return toReturn.substring(0, toReturn.length - ", ".length);
    };

    $scope.displayOtherTags = function(tile) {
      var toReturn = "";
      var tags = [];
      for(var i = 0; i < tile.tileTags.length; i++){
        tags = $scope.getById($scope.tileTags, tile.tileTags[i]);
        for(var j = 0; j < tags.length; j++){
          if(tags[j].tagType == "OtherTags") {
            toReturn += tags[j].tagName + ", ";
          }
        }
      }
      return toReturn.substring(0, toReturn.length - ", ".length);
    }
  });

