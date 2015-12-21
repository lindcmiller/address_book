(function () {
var addressBook = angular.module('addressBook');

  addressBook.controller('DetailCtrl', function($scope, $stateParams, ContactService) {

    var contacts = ContactService.loadContacts()
    .then(function(contacts) {
      $scope.contacts.find(function(contact) {
        return $scope.contact.id === parseInt($stateParams.id);
      });
    });
  });
}());
