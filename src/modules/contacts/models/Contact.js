/**
 * Created by desaroger on 21/11/16.
 */

export default function ContactsModelsContact($q, Restangular, ImageModel) {
  let Contact = Restangular.service('contacts');

  Contact.build = function build(data) {
    return Restangular.restangularizeElement(null, data, 'contacts');
  };

  Contact.updateWithImage = function updateImage(contact, img) {
    let thumbnail = '';
    delete contact.image;
    delete contact.thumbnail;
    delete contact.images;
    return contact.save()
      .then((s) => {
        contact = s;
        return imageThumbnail(img, 100, 100);
      })
      .then((_thumbnail) => thumbnail = _thumbnail)
      .then(() => {
        return ImageModel.getList({contactId: '' + contact.id});
      })
      .then((images) => {
        let image = images[0];
        if (!image) {
          image = ImageModel.build({contactId: '' + contact.id});
        }
        image.image = img;
        image.thumbnail = thumbnail;
        return image.save();
      })
      .then(() => {
          return contact;
      })
  };

  return Contact;


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
    image.onload = function() {
      ctx.drawImage(image, 0, 0, width, height); // Or at whatever offset you like
      deferred.resolve(canvas.toDataURL());
    };
    image.src = img;

    return deferred.promise;
  }
};
