/**
 * Created by desaroger on 20/11/16.
 */

export default function uiService($mdSidenav) {
  let uiService = {};

  // Sidebar
  uiService.toggleSidebar = function toggleSidebar() {
    return $mdSidenav('sidebar').toggle();
  };

  // Search
  uiService.search = false;
  uiService.toggleSearch = function toggleSearch() {
    uiService.search = !uiService.search;
  };


  return uiService;
};
