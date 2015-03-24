'use strict';

describe('Controller: OverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));

  var OverviewCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (/*_$httpBackend_,*/ $controller, $rootScope) {
  //  $httpBackend = _$httpBackend_;
  //  $httpBackend.expectGET('/api/packs')
  //    .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
  //  $httpBackend.expectGET('/api/students')
  //    .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    OverviewCtrl = $controller('OverviewCtrl', {
      $scope: scope
    });
  }));

  it('this is a sanity check', function () {
    expect(true).toBe(true);
  });

  it('should be true', function () {
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
