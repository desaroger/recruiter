/**
 * Created by desaroger on 20/11/16.
 */

import list from './list';
import detail from './detail';
import edit from './edit';

export default ($stateProvider) => {
  $stateProvider
    .state('base.contacts', {                 // List
      url: 'contacts',
      template: list.template,
      controller: list.controller
    })
    .state('base.contacts.detail', {          // Detail
      url: '/:id',
      params: {backButton: true},
      template: detail.template,
      controller: detail.controller
    })
    .state('base.contacts.detail.edit', {     // Edit
      url: '/edit',
      params: {backButton: true},
      template: edit.template,
      controller: edit.controller
    });
};
