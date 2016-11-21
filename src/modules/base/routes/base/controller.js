/**
 * Created by desaroger on 20/11/16.
 */

export default function BaseRoutesBase($state) {
  // Default page
  if ($state.current.name == 'base') {
    $state.go('base.contacts');
  }
};
