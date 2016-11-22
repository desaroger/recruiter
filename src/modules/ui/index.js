/**
 * Module for all UI related. Global styles, sidebar control, etc.
 * The components styles goes to each module.
 *
 * Created by desaroger on 20/11/16.
 */

import './styles.scss'; // Import all global styles, including Angular Material styles.
import uiService from './services/uiService';

export default angular.module('ui', [])
  .service('uiService', uiService)
  .name;
