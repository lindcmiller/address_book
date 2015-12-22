(function () {
var addressBook = angular.module('addressBook');

  addressBook.controller('DetailCtrl', function($scope, $stateParams, ContactService) {

    var loadContactDetail = function() {
      ContactService.loadContactDetail($stateParams.id)
      .then(function(contact) {
        $scope.loaded = true;
        $scope.contact = contact;
      });
    };
    loadContactDetail();
  });
}());
