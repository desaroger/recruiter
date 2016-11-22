/**
 * Global config script.
 *
 * Created by roger on 4/05/16.
 */
export default function CoreConfigScript(RestangularProvider, $mdThemingProvider) {
  RestangularProvider.setBaseUrl('http://localhost:3000/');
  $mdThemingProvider
    .theme('grey')
    .primaryPalette('grey');
}
