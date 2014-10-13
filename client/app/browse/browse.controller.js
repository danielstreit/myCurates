'use strict';

angular.module('curatesApp')
  .controller('BrowseCtrl', function ($scope, $http) {
    $http.get('api/collections')
      .then(function(res) {
        $scope.collections = res.data;
      })
      .catch(function(error) {
        console.error(error);
      });
  });
