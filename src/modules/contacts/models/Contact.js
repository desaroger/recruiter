/**
 * Created by desaroger on 21/11/16.
 */

export default function ContactsModelsContact(Restangular) {
  let Contact = Restangular.service('contacts');

  Contact.build = function build (data) {
    return Restangular.restangularizeElement(null, data, 'contacts');
  };

  return Contact;
};
