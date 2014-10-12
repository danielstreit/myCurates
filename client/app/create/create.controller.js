'use strict';

angular.module('curatesApp')
  .controller('CreateCtrl', function($scope, $http, $location, Auth) {
    $scope.errors = {};
    $scope.collection = {};
    $scope.collection.links = [];
    var user = Auth.getCurrentUser();
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
      $scope.submitted = true;
      if (form.$valid) {
        $http.post('/api/collections', $scope.collection)
          .then(function(res) {
            $location.path('/view/' + res.data.url);
          })
          .catch(function(err) {
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.data.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    }

    $scope.addLink();
  });
