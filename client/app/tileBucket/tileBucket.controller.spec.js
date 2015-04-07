'use strict';

describe('Controller: TileBucketCtrl', function () {

  // load the controller's module
  beforeEach(module('WordRiverApp'));
  beforeEach(module('socketMock'));

  var TileBucketCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TileBucketCtrl = $controller('TileBucketCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('getById test', function() {
    var testArray = [{_id:0},{_id:1},{_id:0},{_id:"5"}];
    var id = "5";
    expect(scope.getById(testArray,id)).toEqual([{_id:"5"}]);
  });

  it('displayContext test', function() {
    var tile = {tileTags:["id2"]};
    scope.tileTags = [{_id:"id1", tagType:"notContext"},{_id:"id2",tagType:"Context",tagName:"This is a context pack"}];
    expect(scope.displayContext(tile)).toEqual("This is a context pack");
  });

  it('displayWordType test', function() {
    var tile = {tileTags:["id2"]};
    scope.tileTags = [{_id:"id1", tagType:"notContext"},{_id:"id2",tagType:"WordType",tagName:"This is a noun/verb.."}];
    expect(scope.displayWordType(tile)).toEqual("This is a noun/verb..");
  });

  it('displayOtherTags test', function() {
    var tile = {tileTags:["id2"]};
    scope.tileTags = [{_id:"id1", tagType:"notContext"},{_id:"id2",tagType:"OtherTags",tagName:"th,sh,.."}];
    expect(scope.displayOtherTags(tile)).toEqual("th,sh,..");
  });
});
