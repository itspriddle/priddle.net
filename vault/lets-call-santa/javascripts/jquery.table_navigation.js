/**
 * jQuery Table Navigation
 *
 * @author      Joshua Priddle <jpriddle@nevercraft.net>
 * @copyright   Copyright (c) 2010, ViaTalk, LLC
 * @version     0.0.1
 * @url         http://github.com/itspriddle/jquery-table_navigation
 */

(function($) {
  $.fn.tableNavigation = function(settings) {

    settings = $.extend({
      start:      0,
      per_page:   10,
      prev_link:  '#prev',
      next_link:  '#next'
    }, settings);

    return this.each(function() {
      var self = $(this),
          rows = self.find('tr');

      if ( ! self.attr('data-start')) {
        self.attr('data-start', settings.start || 0);
      }

      function filterRows(start, stop) {
        rows.each(function(i) {
          $(this)[(i >= start && i < stop) ? 'show' : 'hide']();
        });

        self.attr('data-start', start);
      }

      $(settings.next_link).click(function() {
        var start = parseInt(self.attr('data-start'), 10) + settings.per_page,
            next  = start + settings.per_page;

        if (next >= rows.length) {
          $(this).hide();
        } else {
          $(settings.prev_link).show();
        }

        filterRows(start, next);

        return false;
      });

      $(settings.prev_link).click(function() {
        var stop  = parseInt(self.attr('data-start'), 10),
            start = stop - settings.per_page;

        if (start <= 0) {
          $(this).hide();
        } else {
          $(settings.next_link).show();
        }

        filterRows(start, stop);

        return false;
      });

      var start = parseInt(self.attr('data-start'), 10),
          stop  = start + settings.per_page;

      filterRows(start, stop);

    });
  };
})(jQuery);
