/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesList($scope, $stateParams, Contact) {
  $scope.loadContact = function loadContact(id) {
    return Contact.one(id).get().then((c) => $scope.contact = c);
  };

  // Find on parent scope and if not available, call the API
  $scope.contact = $scope.contacts.find((contact) => contact.id == $stateParams.id);
  if (!$scope.contact) {
    $scope.loadContact($stateParams.id);
  }
};
