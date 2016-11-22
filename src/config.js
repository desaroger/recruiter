/**
 * Global config script.
 *
 * Created by desaroger on 20/11/16.
 */

export default function CoreConfigScript(RestangularProvider, $mdThemingProvider) {
  // The url of the server
  RestangularProvider.setBaseUrl('http://localhost:3000/');
  // The grey theme (used on the search toolbar)
  $mdThemingProvider
    .theme('grey')
    .primaryPalette('grey');
}
