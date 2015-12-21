(function () {
  'use strict';

  var addressBook = angular.module('addressBook', ['ui.router']);

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

    .state('new', {
      url: '/new',
      templateUrl: 'templates/form.html',
      controller: 'ContactCtrl'
    })

    .state('detail', {
      url: '/:id',
      templateUrl: 'templates/detail.html',
      controller: 'DetailCtrl'
    })

    .state('edit', {
      url: '/:id/edit',
      templateUrl: 'templates/form.html',
      controller: 'ContactCtrl'
    });

  });

}());
