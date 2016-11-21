/**
 * Created by desaroger on 20/11/16.
 */

import contacts from './contacts';

export default ($stateProvider) => {
  $stateProvider
    .state('base.contacts', {
      url: 'contacts',
      template: contacts.template,
      resolve: contacts.resolve,
      controller: contacts.controller
    });
};
