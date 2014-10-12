'use strict';

angular.module('curatesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/view/:url',
        templateUrl: 'app/view/view.html',
        controller: 'ViewCtrl'
      });
  });