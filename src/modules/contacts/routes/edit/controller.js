/**
 * Created by desaroger on 21/11/16.
 */

export default function ContactsRoutesList($scope, $state, $q) {

  $scope.save = function save(contact) {
    let isNew = contact.id == 'new';
    return imageThumbnail(contact.image, 100, 100)
      .then((thumbnail) => {
        contact.thumbnail = thumbnail;
        return contact.save();
      })
      .then((s) => {
        $state.go('.^', {id: s.id}, {reload: true});
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


  // Image parsing

  $scope.imageParser = function imageParser(file, base64Object) {
    let deferred = $q.defer();
    let base64Url = makeBase64Url(base64Object);
    deferred.resolve(base64Url);
    return deferred.promise;
  };

  function makeBase64Url(obj) {
    return `data:${obj.filetype};base64,${obj.base64}`;
  }

  function imageThumbnail(img, width, height) {

    let deferred = $q.defer();

    if (!img) {
      deferred.resolve('');
      return deferred.promise;
    }

    // create an off-screen canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    let image = new Image();
    image.onload = function(){
      ctx.drawImage(image, 0, 0, width, height); // Or at whatever offset you like
      deferred.resolve(canvas.toDataURL());
    };
    image.src = img;

    return deferred.promise;
  }
};
