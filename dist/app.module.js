(function () {
  'use strict';

  var addressBook = angular.module('addressBook', [
   'ui.router',
   'LocalStorageModule'
  ]);

  addressBook.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

// HOME - all contacts
    .state('list', {
      url: '/',
      templateUrl: 'templates/list.html',
      controller: 'ContactCtrl'
    })

// SINGLE CONTACT VIEWS - show detail, create, edit

    .state('detail', {
      url: '/:contact:id',
      templateUrl: 'templates/detail.html',
      controller: 'DetailCtrl'
    })

    .state('new', {
      url: '/new',
      templateUrl: 'templates/form.html',
      controller: 'ContactCtrl'
    })

    .state('edit', {
      url: '/:contact:id/edit',
      templateUrl: 'templates/form.html',
      controller: 'ContactCtrl'
    });

  });

}());
