/**
 * Created by desaroger on 20/11/16.
 */

export default function uiService($mdSidenav) {
  let uiService = {};

  // Sidebar
  uiService.toggleSidebar = function toggleSidebar() {
    return $mdSidenav('sidebar').toggle();
  };


  return uiService;
};
