'use strict';

angular.module('curatesApp')
  .controller('MycollectionsCtrl', function ($scope, $http, Auth) {
    var user = Auth.getCurrentUser();
    $http.get('api/collections/' + user._id)
      .then(function(res) {
        $scope.collections = res.data;
      })
      .catch(function(error) {
        console.error(error);
      });
  });
