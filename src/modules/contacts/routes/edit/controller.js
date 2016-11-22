/**
 * Created by desaroger on 21/11/16.
 */
import _ from 'lodash';

export default function ContactsRoutesList($scope, $state, $q, Contact, contactsService) {
  $scope.save = function save(contact) {
    return Contact.updateWithImage(contact, $scope.image)
      .then((contact) => {
        return $scope.loadContact(contact.id);
      })
      .then((contact) => {
        contactsService.update();

        $state.go('.^', {id: contact.id});
      });
  };

  $scope.cancel = function cancel(contact) {
    if ($state.params.id == 'new') {
      $state.go('base.contacts');
    } else {
      $scope.loadContact(contact.id)
        .then(() => {
          $state.go('.^');
        });
    }
  };

  $scope.cleanImage = () => $scope.image = '';


  // Image parsing

  $scope.$watch('contact', (contact) => {
    if ($scope.image) {
      return;
    }
    $scope.image = _.get(contact, 'images[0].image');
  });
  $scope.imageParser = function imageParser(file, base64Object) {
    let deferred = $q.defer();
    let base64Url = makeBase64Url(base64Object);
    deferred.resolve(base64Url);
    return deferred.promise;
  };

  function makeBase64Url(obj) {
    return `data:${obj.filetype};base64,${obj.base64}`;
  }
};
