/**
 * Created by desaroger on 20/11/16.
 */

export default function ContactsRoutesList(contactsService) {
  /** TODO: find a better solution
   * On base/routes/base/controller we have a watcher of the $stateChangeStart, but this events
   * doesn't trigger when the page loads directly the state. So we need this line. Maybe there
   * is another event to attach the update.
   */
  // Updates the contacts list when this is the first.
  contactsService.update();
};
