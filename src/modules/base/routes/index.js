/**
 * Created by desaroger on 20/11/16.
 */

import base from './base';

export default function BaseRoutes($stateProvider, $urlRouterProvider) {
  'ngInject';

  // Default location
  $urlRouterProvider.otherwise('/');

  // Base state, parent of all the states
  $stateProvider
    .state('base', {
      url: '/',
      redirectTo: 'base.contacts',
      template: base.template,
      controller: base.controller
    });
};
