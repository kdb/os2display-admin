/**
 * @file
 * Contains the itkCheckboxWidget module.
 */

/**
 * Setup the module.
 */
(function () {
  'use strict';

  var app;
  app = angular.module("itkCheckboxWidget", []);

  /**
   * checkbox-widget directive.
   *
   * html paramters:
   *   field: The field to modify.
   *   text (string): The text displayed next the checkbox.
   */
  app.directive('checkboxWidget',
    function () {
      return {
        restrict: 'E',
        scope: {
          field: '=',
          text: '@'
        },
        replace: true,
        template: '<span><input type="checkbox" class="cpw--checkbox-input" data-ng-model="field"><span class="cpw--checkbox-text">{{text}}</span></span>'
      };
    }
  );
}).call(this);
