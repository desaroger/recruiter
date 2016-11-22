/**
 * Module for general purpose, core functionality.
 *
 * Created by desaroger on 20/11/16.
 */

import routes from './routes';

export default angular.module('base', [])
  .config(routes)
  .name;
