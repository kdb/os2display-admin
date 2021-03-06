angular.module('datetimePicker').directive('datePicker', function() {
  return {
    restrict: 'A',
    require: '^ngModel',
    link: function(_, el) {
      el.datetimepicker({
        timepicker: false,
        format: 'd.m.Y'
      })
    }
  }
})

function dateDecorator(date) {
  return 'Dato: ' + date
}

function headlineChange(scope) {
  options = scope.slide.options
  date = options.date

  function setInfoHeader(value) {
    
    options.infoheader = value
  }

  if (date.text) {
    setInfoHeader(date.text)
  } else if (date.from && date.to) {
    setInfoHeader(dateDecorator(date.from + ' - ' + date.to))
  } else if (date.from) {
    setInfoHeader(dateDecorator(date.from))
  } else {
    setInfoHeader('')
  }
}

angular.module('toolsModule').directive('eventDatePicker', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      slide: '=',
      close: '&',
      template: '@'
    },
    link: function(scope) {
      scope.onDateChange = function() { headlineChange(scope) }
    },
    templateUrl:
      '/bundles/kkbding2integration/apps/dingEditors/event-date-picker.html'
  }
})
