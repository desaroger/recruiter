/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesList($scope, Contact) {
  $scope.contacts = Contact.getList({_sort: 'name'}).$object;
};
