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
  app = angular.module("itkIconPickerWidget", []);

  /**
   * checkbox-widget directive.
   *
   * html paramters:
   *   field: The field to modify.
   *   text (string): The text displayed next the checkbox.
   */
  app.directive('iconPickerWidget',
    function () {
      return {
        restrict: 'E',
        scope: {
          field: '=',
          icons: '='
        },
        replace: false,
        template:
          '<span ' +
            'data-ng-repeat="icon in icons" ' +
            'data-ng-click="clickIcon(icon.relative_path)" ' +
            'data-ng-style="{\'background-color\': icon.relative_path === field ? \'green\' : \'red\'}" ' +
            'data-ng-class="{\'is-selected\': icon.relative_path === field}">' +
            '<img data-ng-src="{{icon.path}}" />' +
          '</span>',
        link: function(scope) {
          scope.clickIcon = function(icon) {
            scope.field = icon;
          };
        }
      };
    }
  );
}).call(this);
