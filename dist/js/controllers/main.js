(function () {
var addressBook = angular.module('addressBook');

addressBook.controller('ContactCtrl', function($scope, ContactService) {

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

  var loadContacts = function() {
    ContactService.loadContacts()
    .then(function(contacts) {
      $scope.loaded = true;
      $scope.contacts = contacts;
    });
  };

  loadContacts();

  $scope.addContact = function(contact) {
    contact.id = contacts.length;
    contacts.push(contact);
    ContactService.addContact($scope.contact)
      .then(function() {
        loadContacts();
      })
    // after save, change view to list to show added contact? or detail view?
  };

  $scope.editContact = function(contact) {
    contacts.forEach(function(contact) {
      if(contact.editing == true) {
        contact.editing = false;
      }
      contact.editing = true;
    });
  };

  $scope.updateContact = function(contact) {
    ContactService.updateContact(contact)
      .then(function() {
        contact.editing = false;
        loadContacts();
      });
  };

  $scope.deleteContact = function(contact) {
    ContactService.deleteContact(contact)
      .then(function() {
        loadContacts();
      });
  };

  // function validatePhoneNumberFormat(input) {
  //   var format = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  //   if(input.value.match(format)) {
  //     return true;
  //   } else {
  //     console.log("Not a valid phone number. Please use this format:
  //   }
  // };

});
}());
