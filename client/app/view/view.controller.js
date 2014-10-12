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
        $scope.collection.userStars.push(currentUser._id);
      } else {
        $scope.collection.userStars = _.remove($scope.collection.userStars, currentUser._id);
      }
      $scope.starable = !$scope.starable;
      $http.post('api/collections/' + $scope.collection._id, $scope.collection)
          .then(function(res) {
            console.log(res.data);
          })
          .catch(function(error) {
            console.error(error);
          });
    }

    $scope.edit = function() {
      console.log('edit called');
      if ($scope.collection && $scope.collection._id) {
        $http.put('api/collections/' + $scope.collection._id, $scope.collection)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(error) {
            console.error(error);
          });
        
      } else {
        console.error('No collection _id');
      }
    }

  });
