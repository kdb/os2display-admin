/**
 * Base slide, that just displays for slide.duration, then calls the callback.
 */

// Register the function, if it does not already exist.
if (!window.slideFunctions['rss']) {
  window.slideFunctions['rss'] = {
    /**
     * Setup the slide for rendering.
     * @param slide
     *   The slide.
     * @param scope
     *   The slide scope.
     */
    setup: function setupRssSlide(slide, scope) {
      // Only show first image in array.
      if (slide.media_type === 'image' && slide.media.length > 0) {
        slide.currentImage = slide.media[0].image;
      }

      // Set currentLogo.
      slide.currentLogo = slide.logo;

      // Setup the inline styling
      scope.theStyle = {
        width: "100%",
        height: "100%",
        fontsize: slide.options.fontsize * (scope.scale ? scope.scale : 1.0)+ "px"
      };

      // Set the responsive fontsize if it is needed.
      if (slide.options.responsive_fontsize) {
        scope.theStyle.responsiveFontsize = slide.options.responsive_fontsize * (scope.scale ? scope.scale : 1.0)+ "vw";
      }
    },

    /**
     * Run the slide.
     *
     * @param slide
     *   The slide.
     * @param scope
     *   The region scope
     * @param callback
     *   The callback to call when the slide has been executed.
     * @param $http
     *   Access to $http
     * @param $timeout
     *   Access to $timeout
     * @param $interval
     *   Access to $interval
     * @param $sce
     *   Access to $sce
     * @param itkLog
     *   Access to itkLog
     * @param startProgressBar
     *   Function to start the progress bar.
     * @param fadeTime
     *   The fade time.
     */
    run: function runRssSlide(slide, scope, callback, $http, $timeout, $interval, $sce, itkLog, startProgressBar, fadeTime) {
      itkLog.info("Running rss slide: " + slide.title);

      /**
       * Go to next rss news.
       */
      var rssTimeout = function () {
        $timeout(function () {
          if (slide.rss.rssEntry + 1 >= slide.options.rss_number) {
            callback();
          }
          else {
            slide.rss.rssEntry++;
            rssTimeout(slide);
          }
        }, slide.options.rss_duration * 1000);
      };

      // Get the feed
      $http.jsonp(
        '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + slide.options.rss_number + '&callback=JSON_CALLBACK&output=xml&q=' +
        encodeURIComponent(slide.options.source))
        .success(function (data) {
          // Make sure we do not have an error result from googleapis
          if (data.responseStatus !== 200) {
            itkLog.error(data.responseDetails, data.responseStatus);
            if (slide.rss && slide.rss.feed && slide.rss.feed.entries && slide.rss.feed.entries.length > 0) {
              slide.rss.rssEntry = 0;
              rssTimeout(slide);
            }
            else {
              // Go to next slide.
              $timeout(callback, 5000);
            }
            return;
          }

          var xmlString = data.responseData.xmlString;
          slide.rss = {feed: {entries: []}};
          slide.rss.rssEntry = 0;

          slide.rss.feed.title = $sce.trustAsHtml($(xmlString).find('channel > title').text());

          $(xmlString).find('channel > item').each(function () {
            var entry = $(this);

            var news = {};

            news.title = $sce.trustAsHtml(entry.find('title').text());
            news.description = $sce.trustAsHtml(entry.find('description').text());
            news.date = new Date(entry.find('pubDate').text());

            slide.rss.feed.entries.push(news);
          });

          rssTimeout(slide);

          // Set the progress bar animation.
          var dur = slide.options.rss_duration * slide.options.rss_number - 1;
          startProgressBar(dur);
        })
        .error(function (message) {
          itkLog.error(message);
          if (slide.rss.feed && slide.rss.feed.entries && slide.rss.feed.entries.length > 0) {
            slide.rss.rssEntry = 0;
            rssTimeout(slide);
          }
          else {
            // Go to next slide.
            $timeout(callback, 5000);
          }
        });
    }
  }
}