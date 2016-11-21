/**
 * Created by desaroger on 20/11/16.
 */

import base from './base';

export default ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('base', {
      url: '/',
      template: base.template,
      resolve: base.resolve,
      controller: base.controller
    });
};
