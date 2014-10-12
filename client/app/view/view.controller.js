'use strict';

angular.module('curatesApp')
  .controller('ViewCtrl', function ($scope, $stateParams, $http, Auth) {
    var currentUser = Auth.getCurrentUser();
    $scope.loggedIn = currentUser.hasOwnProperty('role');
    $scope.url = $stateParams.url;
    $scope.notFound = false;
    $scope.collection;

    $http.get('api/collections/' + $stateParams.url)
      .then(function(res) {
        $scope.collection = res.data;
        $scope.editable = currentUser.role === 'admin' || 
              $scope.collection.user._id === currentUser._id;
        $scope.cloneable = currentUser._id !== $scope.collection.user._id;
        $scope.starable = !_.contains($scope.collection.userStars, currentUser._id);
      })
      .catch(function(error) {
        $scope.notFound = true;
        console.log(error);
      });

    $scope.toggleStar = function() {
      if ($scope.starable) {
        $scope.starable = false;
        $http.get('api/collections/' + $scope.collection._id + '/addStar/' + currentUser._id)
          .then(function(res) {
            $scope.collection = res.data;
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        $scope.starable = true;
        $http.get('api/collections/' + $scope.collection._id + '/removeStar/' + currentUser._id)
          .then(function(res) {
            $scope.collection = res.data;
          })
          .catch(function(error) {
            console.error(error);
          });
      }
    }

    $scope.edit = function() {
      console.log('edit called');

    }

  });
