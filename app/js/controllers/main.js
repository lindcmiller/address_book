(function () {
var addressBook = angular.module('addressBook');

addressBook.controller('ContactCtrl', function($scope, localStorageService) {

  $scope.contacts = [];
  var contacts = $scope.contacts;

  $scope.contact = {
    name: {},
    addresses: {
      business: {
        location: {}
      },
      home: {
        location: {}
      }
    }
  };

  var contact = $scope.contact;

  $scope.loadContacts = function() {
    $scope.contacts = localStorageService.get('contacts');

    if ($scope.contacts === null) {
      localStorageService.set('contacts', []);
      $scope.loadContacts();
    }
  };

  $scope.loadContacts();

  $scope.addContact = function(contact) {
    var contacts = localStorageService.get('contacts');
    contacts.push(contact);
    localStorageService.set('contacts', contacts);
    // after save, change view to list to show added contact? or detail view? 
  };

  $scope.editContact = function(contact) {
    contacts.forEach(function(contact) {
      contact.editing = false;
      if(contact.editing == true) {
        contact.editing = false;
      }
      contact.editing = true;
    });
  };

  $scope.updateContact = function(contact) {
    var contact = localStorageService.get('contact');
    localStorageService.set(contact);
  };

  $scope.deleteContact = function(contact) {
    var contact = localStorageService.get('contact');
    localStorageService.remove(contact);

  };

});
}());
