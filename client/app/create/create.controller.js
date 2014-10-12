'use strict';

angular.module('curatesApp')
  .controller('CreateCtrl', function($scope, $http, Auth) {
    var user = Auth.getCurrentUser();
    $scope.collection = {};
    $scope.collection.links = [];
    $scope.collection.user = {
      _id: user._id,
      name: user.name
    };
    $scope.addLink = function() {
      $scope.collection.links.push({
        title: '',
        url: '',
        description: ''
      });
    };

    $scope.removeLink = function(index) {
      $scope.collection.links.splice(index, 1);
    };

    $scope.create = function(form) {
      console.log(form.$valid);
      if (form.$valid) {
        console.log($scope.collection);
        $http.post('/api/collections', $scope.collection)
          .then(function(res) {
            console.log(res);
          });
      }
    }

    $scope.addLink();
  });
