/**
 * Restangular model to manage Contacts.
 *
 * Created by desaroger on 21/11/16.
 */

export default function ContactsModelsContact($q, Restangular, ImageModel) {
  // Clean Restangular service
  let Contact = Restangular.service('contacts');

  /**
   * Helper function to build a new Contact
   *
   * @param {Object} data - Contact data
   * @return {Contact} - The resulted Contact
   */
  Contact.build = function build(data) {
    return Restangular.restangularizeElement(null, data, 'contacts');
  };

  /**
   * Utility to update the image of a contact and later update the contact.
   *
   * @param {Contact} contact - The contact to be updated
   * @param {String} img - The base64 url image
   * @return {Promise.<Contact>} - The contact updated
   */
  Contact.updateWithImage = function updateWithImage(contact, img) {
    delete contact.image;                               // Clean the contact
    delete contact.thumbnail;
    delete contact.images;

    return contact.save()                               // Update the contact data
      .then((_contact) => {                             // Build the thumbnail
        contact = _contact;
        return imageThumbnail(img, 100, 100);
      })
      .then((thumbnail) => {                            // Update the image
        let imageWhere = {contactId: '' + contact.id};
        return ImageModel.getList(imageWhere)
          .then((images) => {
            let image = images[0];
            if (!image) {
              image = ImageModel.build(imageWhere);
            }
            image.image = img;
            image.thumbnail = thumbnail;
            return image.save();
          });
      })
      .then((image) => {                                // Return the updated contact
        Object.assign(contact, {images: [image]});
        return contact;
      });
  };

  return Contact;

  /**
   * Utility to make a thumbnail from a base64 url.
   *
   * @param {String} img - The base64 url image
   * @param {int} width - Desired width
   * @param {int} height - Desired height
   * @return {Promise.<String>} - The result thumbnail, as base64 url
   */
  function imageThumbnail(img, width, height) {
    let deferred = $q.defer();

    if (!img) {                                     // If no image, return a void thumbnail
      deferred.resolve('');
      return deferred.promise;
    }

    let canvas = document.createElement('canvas');  // Create an off-screen canvas
    let ctx = canvas.getContext('2d');

    canvas.width = width;                           // Set its dimension to target size
    canvas.height = height;

    let image = new Image();                        // Load the image
    image.onload = function() {
      ctx.drawImage(image, 0, 0, width, height);    // Draw it on the canvas
      deferred.resolve(canvas.toDataURL());         // Return the base64 url
    };
    image.src = img;

    return deferred.promise;
  }
};
