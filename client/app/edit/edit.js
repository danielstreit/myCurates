'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('edit', {
        url: '/edit/:url',
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        authenticate: true
      });
  });