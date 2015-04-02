'use strict';

angular.module('WordRiverApp')
  .controller('AddingWordsCtrl', function ($rootScope, $scope, $http, socket) {
    //$scope.currentUser = Auth.getUser();
    $scope.studentList = [];
    $scope.studentGroups = [];
    $scope.userId = "";
    $scope.contextPacks = [];
    $scope.currentStudent = null;
    $scope.currentStudentWords = null;
    $scope.tileBucket = [];


    $scope.checkedWords=[];
    $scope.checkedStudents=[];

    $scope.wordField = "";

    //beforeEach(module('wordRiverTeamFtlApp'));
    //beforeEach(module('socketMock'));


    $scope.getPacks = function () {
      $http.get('/api/users/me').success(function (user) {
        $scope.contextPacks = $scope.parsePack(user);
        $scope.userId = user._id;
        $scope.studentGroups = user.studentGroups;
        $scope.studentList = user.studentList;
        $scope.tileBucket = user.tileBucket;
        //socket.syncUpdates('pack', $scope.contextPacks);
      }).success(function(){
        $scope.getStudents();
      });
    };
    $scope.getPacks();

    $scope.parsePack = function (contextPack) {
      var data = [];
      for (var i = 0; i < contextPack.tileTags.length; i++) {
        data.push({packName: contextPack.tileTags[i].tagName, tiles: [], _id: contextPack.tileTags[i]._id});
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

    $scope.idInArray = function (array, tileTags) {
      var result = false;
      var indexes = [];
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < tileTags.length; j++)
          if (array[i]._id == tileTags[j]) {
            result = true;
            indexes.push(i);
          }
      }
      return {result: result, index: indexes};
    };

    $scope.getStudents = function () {
      $http.get('/api/students').success(function (studentList) {
        $scope.getMyGroups(studentList);
        var result = $scope.idInArray(studentList, $scope.studentList);
        $scope.studentList.splice(0, $scope.studentList.length);
        for (var i = 0; i < result.index.length; i++) {
          $scope.studentList.push(studentList[result.index[i]]);
        }
        //socket.syncUpdates('student', $scope.studentList);

      });
    };

    $scope.inArray = function(array, toFind){
      for(var i = 0; i < array.length; i++){
        if(array[i] == toFind){
          return {result: true, index: i};
        }
      }
      return {result: false, index: -1};
    }

    $scope.getMyGroups = function(studentList){
      var students = [];
      var result = {};
      for(var i = 0; i < $scope.studentGroups.length; i++){
        for(var j = 0; j < studentList.length; j++){
          result = $scope.inArray($scope.studentGroups[i].students, studentList[j]._id);
          if(result.result){
            students.push(studentList[j]);
          }
        }
        $scope.studentGroups[i].students = students;
      }
    };
    $scope.idInArray = function (array, tileTags) {
      var result = false;
      var indexes = [];
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < tileTags.length; j++)
          if (array[i]._id == tileTags[j]) {
            result = true;
            indexes.push(i);
          }
      }
      return {result: result, index: indexes};
    };

    $scope.addWords = function(){
      if($scope.wordField.length < 1) {
        return;
      }
          <!--these words will be going into the individuals page, possibly the class words, and added to her program (words they can use) -->
      $http.post('/api/users/me', {words: $scope.wordField}).success(function () {
        $scope.getWords();
        $scope.wordField = "";
      });
    };


    $scope.hasDuplicateValues = function() {
      var input = $scope.wordField;
      var array = $scope.allWords;
      for (var i = 0; i < array.length; i++) {
        var arrayValue = array[i].words;
        if (input === arrayValue){
          alert("This word already exists.");
          return true;
        }
      }
      $scope.addWords();
      return false;

    };

    $scope.removeData = function(index){
      $http.delete('/api/users/me', index).success(function(){
        $scope.getWords();
      });
    };

    $scope.checkAllCheckboxes = function(field){
      for (var i = 0; i < field.length; i++){
        field[i].checked = true;
      }
    };

    $scope.unCheckAllCheckboxes = function(field){
      for (var i = 0; i < field.length; i++){
        field[i].checked = false;
      }
    };

    $scope.isChecked = false;
    $scope.studentChecked = false;

    $scope.allCheckedWords = function(object){
      object.value = !object.value;
      if(object.value==!$scope.isChecked){
        console.log('true');
        $scope.checkedWords.push(object.words);
        console.log(object.words);
      }
      else if(object.value == false){
        console.log("false");
      }
    };

    $scope.allCheckedStudents = function(object){
      object.value = !object.value;
      if(object.value == !$scope.studentChecked){
        console.log('true');
        $scope.checkedStudents.push(object.student);
        console.log(object.student);
      }
        else if(object.value == false){
           console.log("false");
       }
    };

    // There wasn't enough time to link it to an actual id
    //$scope.wordsBeingSent = function(){
    //  for(var i=0; i< $scope.checkedStudents.length;i++) {
    //    if($scope.checkedStudents[i] == FindStudentById()){
    //      $http.post('/app/profile_id', {words: $scope.wordField}).success(function () {
    //
    //      })
    //    }
    //  };
    //
    //
    //};
//=========================================================================
    $scope.students = [];
    $scope.classList = [];
    $scope.studentList = [];
    $scope.studentSortArray = [];
    $scope.filterText = null;
    $rootScope.currentStudent = null;


    //creates a list of all classes that exist
    $scope.totalClasses = function(){
      for(var i=0; i<$scope.students.length;i++){
        var found = false;
        for(var j=0; j<=$scope.classList.length; j++){
          if($scope.classList[j]==$scope.students[i].class){
            found = true;
          }
        }
        if (!found){
          $scope.classList.push($scope.students[i].class);
        }
      }
    };

    //creates a list of students
    $scope.populateStudentArray = function(){
      for(var i=0; i<$scope.students.length; i++){
        for(var j=0; j<$scope.classList.length; j++){
          if($scope.students[i].class == $scope.classList[j]){
            var name = $scope.students[i].firstName + " " + $scope.students[i].lastName;
            $scope.studentList.push({student: name, course: $scope.classList[j]});
          }
        }
      }
    };

    //changes the class view
    $scope.changeFilter = function(str){
      $scope.filterText = str;
    };

    $scope.makeCurrentStudent = function(student){
      $rootScope.currentStudent = student;
    };

    $scope.toWords = function(tileBucket){
      var words = [];
      var a = $scope.idInArray($scope.tileBucket, tileBucket);
      if(a.result){
        for(var i = 0; i < a.index.length; i++){
          words.push($scope.tileBucket[a.index[i]].wordName);
        }
      }
      return words;
    };

    $scope.studentInfo = function(student){
      $scope.currentStudent = student.firstName + " " + student.lastName;
      $scope.currentStudentWords = $scope.toWords(student.tileBucket);
    }


  //});

});
