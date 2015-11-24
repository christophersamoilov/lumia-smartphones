'use strict';

/* Controllers */
var lumiaStore = angular.module('lumiaStore', ['ngRoute', 'ngResource']);

/* Config */
lumiaStore.config([
  '$routeProvider', '$locationProvider',
  function ($routeProvide, $locationProvider) {
        $routeProvide
            .when('/', {
                templateUrl: 'store.html',
                controller: 'PhoneListCtrl'
            })
            .when('/products', {
                templateUrl: 'products.html',
                controller: 'ProductsCtrl'
            })
            .when('/support', {
                templateUrl: 'support.html',
                controller: 'SupportCtrl'
            })
            .when('/contact', {
                templateUrl: 'contact.html',
                controller: 'ContactCtrl'
            })
            .when('/phones/:phoneId', {
                templateUrl: 'phone-detail.html',
                controller: 'PhoneDetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
  }
]);

/* Factory */
lumiaStore.factory('Phone', [
  '$resource',
    function ($resource) {
        return $resource('phones/:phoneId.:format', {
            phoneId: 'phones',
            format: 'json',
            apiKey: 'someKeyThis'

        }, {

            update: {
                method: 'PUT',
                params: {
                    phoneId: '@phone'
                },
                isArray: true
            }
        });
  }
]);

/* Filter */
lumiaStore.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    }
});

lumiaStore.controller('PhoneListCtrl', [
  '$scope', '$http', '$location', 'Phone',
  function ($scope, $http, $location, Phone) {

        Phone.query({
            phoneId: 'phones'
        }, function (data) {
            $scope.phones = data;
        });
  }
]);

/* Products Controller */
lumiaStore.controller('ProductsCtrl', [
  '$scope', '$http', '$location',
  function ($scope, $http, $location) {

  }
]);

/* Support Controller */
lumiaStore.controller('SupportCtrl', [
  '$scope', '$http', '$location',
  function ($scope, $http, $location) {

  }
]);

/* Contact Controller */
lumiaStore.controller('ContactCtrl', [
  '$scope', '$http', '$location',
  function ($scope, $http, $location) {

  }
]);

/* Phone Detail Controller */
lumiaStore.controller('PhoneDetailCtrl', [
  '$scope', '$http', '$location', '$routeParams', 'Phone',
  function ($scope, $http, $location, $routeParams, Phone) {
        $scope.phoneId = $routeParams.phoneId;

        Phone.get({
            phoneId: $routeParams.phoneId
        }, function (data) {
            $scope.phone = data;
            $scope.mainImageUrl = data.images[0];
        });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }

  }
]);