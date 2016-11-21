/**
 * Created by desaroger on 21/11/16.
 */

export default function ContactsRoutesList($scope, $state, $q) {
  $scope.save = function save(contact) {
    return contact.save()
      .then(() => {
        $state.go('.^');
      });
  };

  $scope.cancel = function cancel(contact) {
    $scope.loadContact(contact.id)
      .then(() => {
        $state.go('.^');
      });
  };

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
