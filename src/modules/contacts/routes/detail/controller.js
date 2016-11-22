/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesList($scope, $stateParams, $state, Contact, $mdDialog, contactsService) {

  if ($state.$current.name == 'base.contacts.detail' && $stateParams.id == 'new') {
    $state.go('.^');
  }

  $scope.loadContact = function loadContact(id) {
    if (id == 'new') {
      return $scope.contact = Contact.build({emails: [], phones: [], tags: []});
    }
    return Contact.one(id).get({_embed: 'images'}).then((c) => $scope.contact = c);
  };

  // Find on parent scope and if not available, call the API
  $scope.contact = contactsService.list.find((contact) => contact.id == $stateParams.id);
  if (!$scope.contact) {
    $scope.loadContact($stateParams.id);
  }

  // Delete confirmation dialog
  $scope.showConfirmDelete = function(ev) {
    let confirm = $mdDialog.confirm()
      .title('Would you like to delete this contact?')
      .textContent('Will be removed permanently. This action can not be undone.')
      .ariaLabel('delete contact')
      .targetEvent(ev)
      .ok('yes, delete')
      .cancel('cancel');

    return $mdDialog.show(confirm)
      .then(() => $scope.contact.remove())
      .then(() => contactsService.update())
      .then(() => $state.go('base.contacts'));
  };

  contactsService.toggleSearch(false);
};
