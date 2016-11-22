/**
 * Created by desaroger on 20/11/16.
 */

export default function BaseRoutesBase($rootScope, $state, uiService, contactsService) {
  'ngInject';

  // General purpose services on RootScope
  $rootScope.cl = (x) => console.log(x);
  $rootScope.ui = uiService;
  $rootScope.state = $state;
  $rootScope.contacts = contactsService;

  // Redirect to default page
  if ($state.current.name == 'base') {
    $state.go('base.contacts');
  }

  // OnStateChange event
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    // Don't show the detail of a 'new' contact, as has nothing to show
    if (toState.name == 'base.contacts.detail' && toParams.id == 'new') {
      event.preventDefault();
      $state.go('base.contacts');
    }
    // Every time we load base.contacts, an update is made
    if (toState.name == 'base.contacts') {
      contactsService.update();
    }
  });
};
