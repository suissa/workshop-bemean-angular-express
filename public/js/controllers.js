'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('BeerController', function ($scope, $http) {
    
    $scope.msg = 'Cervejas';

    $scope.listar = function(){
      $http({
        method: 'GET',
        url: '/api/beers'
      }).
      success(function (data, status, headers, config) {
        $scope.cervejas = data;
        $scope.msg = 'Listagem das cervejas'
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }
    

  });
