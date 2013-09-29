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
  controller('BeerController', function ($scope, $http, $routeParams) {
    
    $scope.msg = 'Cervejas';
    $scope.form = {};
    $scope.cervejas = [];

    var id = $routeParams.id;
    var url = '/api/beers';

    if(id){
      url += '/'+id;

      $http({
        method: 'GET',
        url: url
      }).
      success(function (data, status, headers, config) {
        $scope.cerveja = data;
        $scope.msg = 'Cerveja: '+data.name
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.criar = function(){
      var dados = $scope.form;

      $http({
        method: 'POST',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        $scope.cerveja = data;
        $scope.cervejas.push(data)
        $scope.msg = 'Cerveja: '+data.name
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.deletar = function(){
      $http({
        method: 'DELETE',
        url: url
      }).
      success(function (data, status, headers, config) {
        $scope.msg = 'Cerveja deletada'
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });

    }

    $scope.salvar= function(){
      var dados = $scope.form;

      $http({
        method: 'PUT',
        url: url,
        data: dados
      }).
      success(function (data, status, headers, config) {
        // $scope.cervejas = data;
        $scope.msg = 'Cerveja Atualizada'

        // Buscar a info da nova cerveja
        $http({
          method: 'GET',
          url: '/api/beers/'+id
        }).
        success(function (data, status, headers, config) {
          $scope.cerveja = data;
          $scope.msg = 'Cerveja: '+data.name;
          $scope.cervejas.push(data);

        }).
        error(function (data, status, headers, config) {
          $scope.msg = 'Error!'
        });

      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!'
      });
    }

    $scope.listar = function(){
      $http({
        method: 'GET',
        url: url
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
