/* helix.js - Custom JavaScript for Helix admin static reproduction */

(function($) {
  'use strict';

  // Active nav highlighting based on current page
  function highlightNav() {
    var path = window.location.pathname;

    // Extract the segment after /helix/ — e.g., 'orders', 'partners', 'settings.html'
    var match = path.match(/\/helix\/([^\/]+)/);
    var segment = match ? match[1] : '';

    // Map path segments to nav tab text
    var mapping = {
      'orders': 'Orders',
      'accounts': 'Accounts',
      'services': 'Services',
      'domain-services': 'Domains',
      'reports': 'Reports',
      'partners': 'Partners',
      'settings.html': 'Settings',
      'search.html': 'Search',
      'brands': 'Settings',
      'staffs': 'Settings',
      'roles': 'Settings',
      'api-users': 'Settings',
      'email-templates': 'Settings',
      'bundles': 'Settings',
      'backups': 'Settings',
      'customers': 'Accounts',
      'invoices': 'Orders',
      'payments': 'Orders',
      'audits.html': 'Settings',
      'system-logs.html': 'Settings',
      'profile.html': 'Dashboard'
    };

    var navText = mapping[segment] || 'Dashboard';

    $('#nav > li').removeClass('current');

    $('#nav > li > a').each(function() {
      if ($(this).text().trim() === navText) {
        $(this).parent().addClass('current');
      }
    });
  }

  // Fake table sorting (visual only)
  function initTableSort() {
    $('.table thead th a').on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      var $thead = $this.closest('thead');

      // Cycle: undefined -> asc -> desc -> undefined
      if ($this.hasClass('sort_asc')) {
        $thead.find('a').removeClass('sort_asc sort_desc');
        $this.addClass('sort_desc');
      } else if ($this.hasClass('sort_desc')) {
        $thead.find('a').removeClass('sort_asc sort_desc');
      } else {
        $thead.find('a').removeClass('sort_asc sort_desc');
        $this.addClass('sort_asc');
      }
    });
  }

  // Confirmation modals
  function initModals() {
    $('[data-confirm]').on('click', function(e) {
      e.preventDefault();
      var msg = $(this).data('confirm');
      var href = $(this).attr('href');

      var $modal = $('#confirm-modal');
      if ($modal.length === 0) {
        $modal = $('<div id="confirm-modal" class="modal hide fade">' +
          '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
            '<h3>Confirm Action</h3>' +
          '</div>' +
          '<div class="modal-body"><p></p></div>' +
          '<div class="modal-footer">' +
            '<a href="#" class="btn" data-dismiss="modal">Cancel</a>' +
            '<a href="#" class="btn btn-danger confirm-btn">Confirm</a>' +
          '</div>' +
        '</div>');
        $('body').append($modal);
      }

      $modal.find('.modal-body p').text(msg);
      $modal.find('.confirm-btn').attr('href', href || '#');
      $modal.modal('show');
    });
  }

  // Subnav dropdown behavior (Bootstrap 2 compatible)
  function initSubnav() {
    $('#subnav .dropdown-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).parent().toggleClass('open');
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('#subnav .dropdown').length) {
        $('#subnav .dropdown').removeClass('open');
      }
    });
  }

  // Table row hover highlight
  function initTableHover() {
    $('.table-hover tbody tr, .table-striped tbody tr').on('mouseenter', function() {
      $(this).addClass('hover');
    }).on('mouseleave', function() {
      $(this).removeClass('hover');
    });
  }

  // Collapsible search filters
  function initFilters() {
    $('.filter-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).closest('.search-form').find('.filter-body').slideToggle(200);
      $(this).find('.fa').toggleClass('fa-chevron-down fa-chevron-up');
    });
  }

  // Tooltip init
  function initTooltips() {
    $('[rel="tooltip"], [data-toggle="tooltip"]').tooltip();
  }

  // Initialize everything on document ready
  $(function() {
    highlightNav();
    initTableSort();
    initModals();
    initSubnav();
    initTableHover();
    initFilters();
    initTooltips();
  });

})(jQuery);
