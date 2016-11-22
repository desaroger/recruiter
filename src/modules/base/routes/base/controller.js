/**
 * Created by desaroger on 20/11/16.
 */

export default function BaseRoutesBase($rootScope, $state, contactsService) {
  // Default page
  if ($state.current.name == 'base') {
    $state.go('base.contacts');
  }


  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    if (toState.name == 'base.contacts.detail' && toParams.id == 'new') {
      event.preventDefault();
      $state.go('base.contacts');
    }
    if (toState.name == 'base.contacts') {
      contactsService.update();
    }
  });

};
