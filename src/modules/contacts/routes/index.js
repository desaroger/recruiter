/**
 * Created by desaroger on 20/11/16.
 */

import list from './list';
import detail from './detail';
import edit from './edit';

export default ($stateProvider) => {
  $stateProvider
    .state('base.contacts', {
      url: 'contacts',
      template: list.template,
      controller: list.controller
    })
    .state('base.contacts.detail', {
      url: '/:id',
      params: {backButton: true},
      template: detail.template,
      controller: detail.controller
    })
    .state('base.contacts.detail.edit', {
      url: '/edit',
      params: {backButton: true},
      template: edit.template,
      controller: edit.controller
    });
};