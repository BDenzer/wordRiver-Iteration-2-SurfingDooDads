'use strict';

describe('Controller: OverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));

  var OverviewCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/packs')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    $httpBackend.expectGET('/api/students')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    OverviewCtrl = $controller('OverviewCtrl', {
      $scope: scope
    });
  }));

  it('this is a sanity check', function () {
    expect(true).toBe(true);
  });

  it('addTile test', function () {
    scope.currentPack = {tiles: []};
    scope.addTile();
    expect(scope.currentPack.tiles.length).toBe(0);
    scope.tileField = "Word";
    scope.addTile();
    expect(scope.currentPack.tiles.length).toBe(0);
    scope.tileType = "Type";
    scope.addTile();
    expect(scope.currentPack.tiles.length).toBe(1);
    scope.addTile();
    expect(scope.currentPack.tiles.length).toBe(1);
    expect(scope.currentPack.tiles[0].word).toBe("Word");
    expect(scope.currentPack.tiles[0].type).toBe("Type");

  });

  it('deleteTile test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {tiles: []};
    scope.contextPacks[0].tiles = [{word: "Word", type: "Type"}, {word: "New", type: "Type"}, {word: "Pack", type: "Type"}, {word: "WordPack", type: "Type"}];
    scope.deleteTile(scope.contextPacks[0], 2);
    expect(scope.contextPacks[0].tiles[0].word).toBe("Word");
    expect(scope.contextPacks[0].tiles[1].word).toBe("New");
    expect(scope.contextPacks[0].tiles[2].word).toBe("WordPack");
    scope.deleteTile(scope.contextPacks[0], 0);
    expect(scope.contextPacks[0].tiles[0].word).toBe("New");
    expect(scope.contextPacks[0].tiles[1].word).toBe("WordPack");
    scope.deleteTile(scope.contextPacks[0], 1);
    expect(scope.contextPacks[0].tiles[0].word).toBe("New");
    scope.deleteTile(scope.contextPacks[0],0);
    expect(scope.contextPacks[0].tiles.length).toBe(0);


  });

  it('toggleShowAdder test', function () {
    scope.showTileAdder = false;
    scope.toggleShowAdder()
    expect(scope.showTileAdder).toBe(true);
    scope.toggleShowAdder()
    expect(scope.showTileAdder).toBe(false);

  });

  it('packInfo test', function () {
    scope.contextPacks = [];
    scope.contextPacks[0] = {packName: "test", tiles: []};
    scope.showPack = false;
    scope.currentPack = null;
    scope.packInfo(scope.contextPacks[0]);
    expect(scope.showPack).toBe(true);
    expect(scope.currentPack.packName).toBe("test");

  });

  it('addContextPacks test', function () {
    scope.contextPacks = [];
    scope.addContextPacks();
    expect(scope.contextPacks.length).toBe(0);
    scope.textField = "Pack";
    scope.addContextPacks();
    expect(scope.contextPacks.length).toBe(1);
    scope.addContextPacks();
    expect(scope.contextPacks.length).toBe(1);
    expect(scope.contextPacks[0].packName).toBe("Pack");

  });

  it('deletePack test', function () {
    scope.contextPacks = [];
    scope.textField = "Pack";
    scope.addContextPacks();
    scope.textField = "New";
    scope.addContextPacks();
    scope.textField = "Packs";
    scope.addContextPacks();
    scope.textField = "Packie";
    scope.addContextPacks();
    scope.deletePack(2);
    expect(scope.contextPacks[0].packName).toBe("Pack");
    expect(scope.contextPacks[1].packName).toBe("New");
    expect(scope.contextPacks[2].packName).toBe("Packie");
    scope.deletePack(0);
    expect(scope.contextPacks[0].packName).toBe("New");
    expect(scope.contextPacks[1].packName).toBe("Packie");
    scope.deletePack(1);
    expect(scope.contextPacks[0].packName).toBe("New");
    scope.deletePack(0);
    expect(scope.contextPacks.length).toBe(0);

  });
  //it('should attach a list of things to the scope', function () {
  //  $httpBackend.flush();
  //  expect(scope.awesomeThings.length).toBe(4);
  //});

  //These tests don't test functionality, they should probably be removed. -Lemmon
  //it('should be things in the list i.e. heroPack, zoo, biomes, cars, disney', function () {
  //  expect(scope.contextPacks[0].pack).toBe('heroPack');
  //  expect(scope.contextPacks[1].pack).toBe('zoo');
  //  expect(scope.contextPacks[2].pack).toBe('biomes');
  //  expect(scope.contextPacks[3].pack).toBe('cars');
  //  expect(scope.contextPacks[4].pack).toBe('disney');
  //  expect(scope.contextPacks[5]).toBe(undefined);
  //});

  //it('should be 5', function () {
  //  expect(scope.contextPacks.length).toBe(5);
  //});
});
