/**
 * @file
 * Contains slide directives to display and edit a slide.
 */

/**
 * Directive to insert html for a slide.
 * @param ik-id: the id of the slide.
 * @param ik-width: the width of the slide.
 */
angular.module('ikApp').directive('ikSlide', ['slideFactory', 'templateFactory', 'busService',
  function (slideFactory, templateFactory, busService) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        ikWidth: '@',
        ikSlide: '='
      },
      link: function (scope, element, attrs) {
        scope.templateURL = '/app/shared/elements/slide/slide-loading.html?' + window.config.version;

        // Observe for changes to the ik-slide attribute. Setup slide when ik-slide is set.
        attrs.$observe('ikSlide', function (val) {
          if (!val) {
            return;
          }

          if (scope.ikSlide.media_type === 'image') {
            if (scope.ikSlide.media.length > 0) {
              scope.ikSlide.currentImage = scope.ikSlide.media[0].urls.default_landscape_small;
            }
            else {
              scope.ikSlide.currentImage = '';
            }
          }
          else {
            if (scope.ikSlide.media.length > 0 &&
                scope.ikSlide.media[0].provider_metadata.length > 0 &&
                scope.ikSlide.media[0].provider_metadata[0].thumbnails &&
                scope.ikSlide.media[0].provider_metadata[0].thumbnails.length > 0
            ) {
              scope.ikSlide.currentImage = scope.ikSlide.media[0].provider_metadata[0].thumbnails[1].reference;
            }
            else {
              scope.ikSlide.currentImage = '';
            }
          }

          // Set the currentLogo variable.
          if (scope.ikSlide.logo !== undefined && scope.ikSlide.logo !== null) {
            scope.ikSlide.currentLogo = scope.ikSlide.logo.urls.default_landscape;
          }
          else {
            scope.ikSlide.currentLogo = '';
          }

          // Get the template.
          templateFactory.getSlideTemplate(scope.ikSlide.template).then(
            function success(data) {
              scope.template = data;
              scope.templateURL = scope.template.paths.preview;

              scope.theStyle = {
                width: "" + scope.ikWidth + "px",
                height: "" + parseFloat(1080.0 * parseFloat(scope.ikWidth / 1920.0)) + "px"
              };

              if (scope.ikSlide.options.fontsize) {
                scope.theStyle.fontsize = "" + parseFloat(scope.ikSlide.options.fontsize * parseFloat(scope.ikWidth / scope.template.ideal_dimensions.width)) + "px"
              }
            },
            function error(reason) {
              busService.$emit('log.error', {
                'cause': reason,
                'msg': 'Hentning af templates fejlede.'
              });
            }
          );
        });
      },
      template: '<div class="preview--slide" data-ng-style="{\'width\': theStyle.width}" data-ng-include="" src="templateURL"></div>'
    }
  }
]);
