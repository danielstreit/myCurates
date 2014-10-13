'use strict';

angular.module('curatesApp')
  .controller('EditCtrl', function($scope, $http, $location, $stateParams, Auth) {
    $scope.pageTitle = _.contains($location.path(), 'edit') ? 'Edit' : 'Create';
    $scope.errors = {};
    $scope.collection = {};
    $scope.collection.links = [];
    var user = Auth.getCurrentUser();
    $scope.collection.user = {
      _id: user._id,
      name: user.name
    };

    // If this is a request to edit a collection, retrieve it
    if ($stateParams.url) {
      $http.get('api/collections/' + $stateParams.url)
        .then(function(res) {
          // Is this user allowed to edit this collection?
          if (res.data.user._id === user._id && user.role !== 'admin') {
            $scope.collection = res.data;
            console.log($scope.collection);
          } else {
            $scope.notUser = true;
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    }

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

    $scope.submit = function(form) {
      $scope.submitted = true;
      var url = 'api/collections/';
      if ($scope.collection._id) {
        url += $scope.collection._id;
      }
      console.log(url);
      if (form.$valid) {
        $http.post(url, $scope.collection)
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
