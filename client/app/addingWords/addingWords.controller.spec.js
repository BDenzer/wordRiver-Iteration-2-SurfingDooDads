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

  it('new addWord test', function () {
    scope.wordToAdd2 = {_id: "2", wordName: "cat"};
    scope.student1 = {_id: "0", tileBucket: []};
    scope.student1.tileBucket = [];
    scope.currentStudentWords = [];
    scope.addWord();
    expect(scope.student1.tileBucket[0]).toBe("2");
    expect(scope.currentStudentWords[0]).toBe("cat");
  });

  //it('deleteTile test', function () {
  //  scope.contextPacks = [];
  //  scope.contextPacks[0] = {tiles: []};
  //  scope.contextPacks[0].tiles = [{word: "Word", type: "Type"}, {word: "New", type: "Type"}, {word: "Pack", type: "Type"}, {word: "WordPack", type: "Type"}];
  //  scope.deleteTile(scope.contextPacks[0], 2);
  //  expect(scope.contextPacks[0].tiles[0].word).toBe("Word");
  //  expect(scope.contextPacks[0].tiles[1].word).toBe("New");
  //  expect(scope.contextPacks[0].tiles[2].word).toBe("WordPack");
  //  scope.deleteTile(scope.contextPacks[0], 0);
  //  expect(scope.contextPacks[0].tiles[0].word).toBe("New");
  //  expect(scope.contextPacks[0].tiles[1].word).toBe("WordPack");
  //  scope.deleteTile(scope.contextPacks[0], 1);
  //  expect(scope.contextPacks[0].tiles[0].word).toBe("New");
  //  scope.deleteTile(scope.contextPacks[0],0);
  //  expect(scope.contextPacks[0].tiles.length).toBe(0);
  //
  //
  //});
  //
  //it('toggleShowAdder test', function () {
  //  scope.showTileAdder = false;
  //  scope.toggleShowAdder();
  //  expect(scope.showTileAdder).toBe(true);
  //  scope.toggleShowAdder();
  //  expect(scope.showTileAdder).toBe(false);
  //
  //});
  //
  //it('packInfo test', function () {
  //  scope.contextPacks = [];
  //  scope.contextPacks[0] = {packName: "test", tiles: []};
  //  scope.showPack = false;
  //  scope.currentPack = null;
  //  scope.packInfo(scope.contextPacks[0]);
  //  expect(scope.showPack).toBe(true);
  //  expect(scope.currentPack.packName).toBe("test");
  //
  //});
  //
  //it('addContextPacks test', function () {
  //  scope.contextPacks = [];
  //  scope.addContextPacks();
  //  expect(scope.contextPacks.length).toBe(0);
  //  scope.textField = "Pack";
  //  scope.addContextPacks();
  //  expect(scope.contextPacks.length).toBe(1);
  //  scope.addContextPacks();
  //  expect(scope.contextPacks.length).toBe(1);
  //  expect(scope.contextPacks[0].packName).toBe("Pack");
  //
  //});
  //
  //it('deletePack test', function () {
  //  scope.contextPacks = [];
  //  scope.textField = "Pack";
  //  scope.addContextPacks();
  //  scope.textField = "New";
  //  scope.addContextPacks();
  //  scope.textField = "Packs";
  //  scope.addContextPacks();
  //  scope.textField = "Packie";
  //  scope.addContextPacks();
  //  scope.deletePack(2);
  //  expect(scope.contextPacks[0].packName).toBe("Pack");
  //  expect(scope.contextPacks[1].packName).toBe("New");
  //  expect(scope.contextPacks[2].packName).toBe("Packie");
  //  scope.deletePack(0);
  //  expect(scope.contextPacks[0].packName).toBe("New");
  //  expect(scope.contextPacks[1].packName).toBe("Packie");
  //  scope.deletePack(1);
  //  expect(scope.contextPacks[0].packName).toBe("New");
  //  scope.deletePack(0);
  //  expect(scope.contextPacks.length).toBe(0);
  //
  //});

  it('idInArray test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tiles: []};
    scope.contextPacks[0].tiles = [{word: "Word", type: "Type",_id: "id"}, {word: "New", type: "Type"}, {word: "Pack", type: "Type"}, {word: "WordPack", type: "Type"}];
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).index[0]).toBe(0)
    expect(scope.idInArray(scope.contextPacks[0].tiles, ["id"]).result).toBe(true)
  });

  it('paresPack test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tileTags: [], tileBucket: []};
    scope.contextPacks[0].tileBucket = [{word: "Word", tileTags: "Type",_id: "id"}, {word: "New", tileTags: "Type"}, {word: "Pack", tileTags: "Type"}, {word: "WordPack", tileTags: "Type"}];
    scope.contextPacks[0].tileTags = [{tagName: "verb", _id: "id"}]
    expect(scope.parsePack(scope.contextPacks[0])[0].packName).toBe("verb")
  });
  //
  //it('getPackIndex test', function () {
  //  scope.contextPacks = [];
  //  scope.contextPacks[0] = {_id: "1"};
  //  scope.contextPacks[1] = {_id: "2"};
  //  scope.contextPacks[2] = {_id: "3"};
  //  expect(scope.getPackIndex({_id: "2"})).toBe(1);
  //});

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
