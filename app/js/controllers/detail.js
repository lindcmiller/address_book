(function () {
var addressBook = angular.module('addressBook');

addressBook.controller('DetailCtrl', function($scope, localStorageService, $stateParams) {

  var contacts = localStorageService.get('contacts');
  $scope.contact = contacts.find(function(contact) {
    return contact.id === parseInt($stateParams.id);
  });
});

}());
