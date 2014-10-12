'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myCollections', {
        url: '/myCollections',
        templateUrl: 'app/myCollections/myCollections.html',
        controller: 'MycollectionsCtrl'
      });
  });