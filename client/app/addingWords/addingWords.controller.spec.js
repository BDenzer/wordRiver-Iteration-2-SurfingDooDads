'use strict';

describe('Controller: AddingWordsCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));


  var AddingWordsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddingWordsCtrl = $controller('AddingWordsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('this is a sanity check', function () {
    expect(true).toBe(true);
  });

  it('addWord test', function () {
    scope.wordToAdd2 = {_id: "2", wordName: "cat"};
    scope.student1 = {_id: "0", tileBucket: []};
    scope.student1.tileBucket = [];
    scope.currentStudentWords = [];
    scope.addWord();
    expect(scope.student1.tileBucket[0]).toBe("2");
    expect(scope.currentStudentWords[0]).toBe("cat");
  });


  it('idInArray test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tiles: []};
    scope.contextPacks[0].tiles = [{word: "Word", type: "Type",_id: "id"}, {word: "New", type: "Type"}, {word: "Pack", type: "Type"}, {word: "WordPack", type: "Type"}];
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).index[0]).toBe(0)
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).result).toBe(true)
  });

  it('parsePack test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tileTags: [], tileBucket: []};
    scope.contextPacks[0].tileBucket = [{word: "Word", tileTags: "Type",_id: "id"}, {word: "New", tileTags: "Type"}, {word: "Pack", tileTags: "Type"}, {word: "WordPack", tileTags: "Type"}];
    scope.contextPacks[0].tileTags = [{tagName: "verb", _id: "id"}]
    expect(scope.parsePack(scope.contextPacks[0])[0].packName).toBe("verb")
  });

  it('idInArray test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tiles: []};
    scope.contextPacks[0].tiles = [{word: "Word", type: "Type",_id: "id"}, {word: "New", type: "Type"}, {word: "Pack", type: "Type"}, {word: "WordPack", type: "Type"}];
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).index[0]).toBe(0)
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).result).toBe(true)
  });

  it('inArray test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = "1";
    scope.contextPacks[1] = "2";
    scope.contextPacks[2] = "3";
    expect(scope.inArray(scope.contextPacks, "2").index).toBe(1);
    expect(scope.inArray(scope.contextPacks, "1").index).toBe(0);
    expect(scope.inArray(scope.contextPacks, "3").index).toBe(2);
    expect(scope.inArray(scope.contextPacks, "4").index).toBe(-1);
    expect(scope.inArray(scope.contextPacks, "2").result).toBe(true);
    expect(scope.inArray(scope.contextPacks, "1").result).toBe(true);
    expect(scope.inArray(scope.contextPacks, "3").result).toBe(true);
    expect(scope.inArray(scope.contextPacks, "4").result).toBe(false);
  });

  it('getMyGroups test', function () {
    scope.studentGroups = [{students: []}];
    scope.studentGroups[0].students[0] = "1";
    scope.studentGroups[0].students[1] = "2";
    scope.studentGroups[0].students[2] = "3";
    for(var i=3; i < 10000000; i++){
      scope.studentGroups[0].students[i] = i;
    }
    var students = [{_id: "1", firstName:"bob"}, {_id: "3", firstName: "jim"}];
    scope.getMyGroups(students);
    expect(scope.studentGroups[0].students[0].firstName).toBe("bob");
    expect(scope.studentGroups[0].students[1].firstName).toBe("jim");

  });

});
