(function () {
var addressBook = angular.module('addressBook');

addressBook.controller('ContactCtrl', function($scope, localStorageService, $stateParams) {

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
    contact.id = contacts.length;
    contacts.push(contact);
    localStorageService.set('contacts', contacts);
    // after save, change view to list to show added contact? or detail view?
  };

  $scope.editContact = function(contact) {
    var contacts = localStorageService.get('contacts');
    contacts.forEach(function(contact) {
      contact.editing = false;
      if(contact.editing == true) {
        contact.editing = false;
      }
      contact.editing = true;
    });

  };
  
  // $scope.updateContact = function(updatedContact) {
  //   contact.editing = true;
  //   var contact = localStorageService.get('contact');
  //   contact.replace(updatedContact);
  //   localStorageService.set('contact', contact);
  // };

  $scope.deleteContact = function(contact) {
    var contacts = localStorageService.get('contacts')
    .filter(function(c) {
      return contact.id !== c.id;
    });
    localStorageService.set('contacts', contacts);
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
