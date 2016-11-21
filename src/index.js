/**
 * Created by desaroger on 19/11/16.
 */

// Vendor
import angular from 'angular';
import angularMaterial from 'angular-material';
import angularAnimate from 'angular-animate';
import angularUiRouter from 'angular-ui-router';

// Globals
// import 'angular-material/angular-material.css';

// App
import ConfigBoot from './config';
import baseModule from './modules/base';
import uiModule from './modules/ui';
import contactsModule from './modules/contacts';


angular.module('app',
  [
    // Vendor
    angularMaterial,
    angularAnimate,
    angularUiRouter,

    // App
    baseModule,
    uiModule,
    contactsModule
  ])
  .config(ConfigBoot);
