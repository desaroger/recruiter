/**
 * Created by desaroger on 20/11/16.
 */

import routes from './routes';
import ContactModel from './models/Contact';

export default angular.module('contacts', [])
  .config(routes)
  .factory('Contact', ContactModel)
  .name;
