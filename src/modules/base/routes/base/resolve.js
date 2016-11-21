/**
 * Created by desaroger on 20/11/16.
 */

export default {

  // Populate rootScope with some critical utilities
  'rootScopeResolver': ($rootScope, uiService, $state) => {
    $rootScope.cl = (x) => console.log(x);
    $rootScope.ui = uiService;
    $rootScope.state = $state;
  }

};
