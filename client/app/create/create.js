'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        authenticate: true
      })
      .state('clone', {
        url: '/clone/:url',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        authenticate: true
      });
  });