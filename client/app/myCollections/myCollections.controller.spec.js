'use strict';

describe('Controller: MycollectionsCtrl', function () {

  // load the controller's module
  beforeEach(module('curatesApp'));

  var MycollectionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MycollectionsCtrl = $controller('MycollectionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
