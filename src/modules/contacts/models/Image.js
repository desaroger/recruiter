/**
 * Restangular model to manage Images.
 *
 * Created by desaroger on 22/11/16.
 */

export default function ContactsModelsImage(Restangular) {
  // Clean Restangular service
  let Image = Restangular.service('images');

  /**
   * Helper function to build a new Image
   *
   * @param {Object} data - Image data
   * @return {Contact} - The resulted Image
   */
  Image.build = function build(data) {
    return Restangular.restangularizeElement(null, data, 'images');
  };

  return Image;
};
