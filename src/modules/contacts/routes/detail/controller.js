/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesDetail($scope, $stateParams, $state, Contact, $mdDialog, contactsService) {
  'ngInject';

  /** TODO: find a better solution
   * Same issue as described on contacts/routes/list/controller.
   */
  // If it's a new element doesn't allow load the detail state.
  if ($state.$current.name == 'base.contacts.detail' && $stateParams.id == 'new') {
    $state.go('.^');
  }

  /**
   * Loads a contact and populates the scope. It's called from child controllers.
   *
   * @param {string} id - The id of the desired contact
   * @return {Promise.<Contact>} - The found contact
   */
  $scope.loadContact = function loadContact(id) {
    if (id == 'new') {
      return $scope.contact = Contact.build({emails: [], phones: [], tags: []});
    }
    return Contact.one(id).get({_embed: 'images'}).then((c) => $scope.contact = c);
  };

  /**
   * Shows a confirmation for delete the contact.
   *
   * @param {Event} ev - The event of the click.
   */
  $scope.showConfirmDelete = function showConfirmDelete(ev) {
    let confirm = $mdDialog.confirm()
      .title('Would you like to delete this contact?')
      .textContent('Will be removed permanently. This action can not be undone.')
      .ariaLabel('delete contact')
      .targetEvent(ev)
      .ok('yes, delete')
      .cancel('cancel');

    $mdDialog.show(confirm)
      .then(() => $scope.contact.remove())
      .then(() => contactsService.update())
      .then(() => $state.go('base.contacts'));
  };

  // Find on parent scope and if not available, call the API.
  $scope.contact = contactsService.list.find((contact) => contact.id == $stateParams.id);
  if (!$scope.contact) {
    $scope.loadContact($stateParams.id);
  }

  // When we are on the detail (or childs), the search must be disabled.
  contactsService.toggleSearch(false);
};
