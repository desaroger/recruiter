/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesList($scope, contactsService) {
  $scope.contactsService = contactsService;
  contactsService.update();
};
