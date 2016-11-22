/**
 * Module for contacts functionality. Has the routes, models, services.
 * This is the main module of this app, as for now there is no more functionality besides that.
 *
 * Created by desaroger on 20/11/16.
 */

import routes from './routes';
import ContactModel from './models/Contact';
import ImageModel from './models/Image';
import ContactService from './services/contacts';

export default angular.module('contacts', [])
  .config(routes)
  .factory('Contact', ContactModel)
  .factory('ImageModel', ImageModel)
  .service('contactsService', ContactService)
  .name;
