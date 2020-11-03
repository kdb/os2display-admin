angular.module("toolsModule").directive("eventPlaceSimple", function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      slide: "=",
      close: "&",
      template: "@",
    },
    templateUrl:
      "/bundles/kkbding2integration/apps/dingEditors/event-place-simple.html",
  };
});
