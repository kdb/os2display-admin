/**
 * @file
 * Contains the ikApp module.
 */

/**
 * ikApp - Main entry point for the app.
 *
 * Register whitelist.
 */
angular.module('ikApp').config(function ($sceDelegateProvider) {
  'use strict';

  // The administration interface and the client code do not run on the same
  // domain/sub-domain hence we need to whitelist the domains to load slide
  // templates and CSS form the administration domain.
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    '**'
  ]);
});
