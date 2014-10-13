'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mycollections', {
        url: '/mycollections',
        templateUrl: 'app/myCollections/myCollections.html',
        controller: 'MycollectionsCtrl'
      });
  });