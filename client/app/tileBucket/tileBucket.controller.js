'use strict';

angular.module('WordRiverApp')
  .controller('TileBucketCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';
    $scope.tileBucket = [];
    $scope.image = "";
    $scope.getTileBucket = function() {
      $http.get('/api/users/me').success(function(user) {
        console.log('We got a user!!');
        $scope.tileBucket = user.tileBucket;
        console.log($scope.tileBucket);
        //socket.syncUpdates('student', $scope.students);
      });
    };
    $scope.getTileBucket();

    $scope.displayImage = function(tile) {
        $scope.image = tile.img;
      document.getElementById("Image").innerHTML = "<u>" + "<img src=\"" + tile.img +"\"" + "alt=\"This tile does not have an image\" align=\"middle\" height=\"450\" width=\"450\">" + "</u><br/>";

    }
  });

