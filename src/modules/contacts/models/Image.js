/**
 * Created by desaroger on 22/11/16.
 */

export default function ContactsModelsImage(Restangular) {
  let Image = Restangular.service('images');

  Image.build = function build(data) {
    return Restangular.restangularizeElement(null, data, 'images');
  };

  return Image;
};
