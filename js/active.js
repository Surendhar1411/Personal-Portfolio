(function ($) {
  ('use strict');

  const handleLoad = function () {
    // Preloader Active Code
    $('#container').addClass('loaded');
    if ($('#container').hasClass('loaded')) {
      $('#preloader')
        .delay(500)
        .queue(function () {
          $(this).remove();
        });
    }

    // WoW Js
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 100,
      mobile: true,
      live: true,
    });
    wow.init();

    // Funfact
    if ($('.odometer').length > 0) {
      $('.odometer').appear(function () {
        var odo = $('.odometer');
        odo.each(function () {
          var countNumber = $(this).attr('data-count');
          $(this).html(countNumber);
        });
      });
    }

    // Isotop Projects Filter
    const $container = $('.projects-container');
    $container.isotope({
      filter: '*',
      animationOptions: {
        queue: true,
      },
    });

    $('.project-section ul li').click(function () {
      $('.project-section ul li.active').removeClass('active');
      $(this).addClass('active');
      const selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          queue: true,
        },
      });
      return false;
    });

    // Refresh layout after 500ms and 1500ms to resolve any dynamic rendering heights and cached image overlaps
    setTimeout(function() {
      $container.isotope('layout');
    }, 500);
    setTimeout(function() {
      $container.isotope('layout');
    }, 1500);
  };

  // Run immediately if document is already complete, otherwise bind to load event
  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    $(window).on('load', handleLoad);
  }

  // Sticky Header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
      $('.site-header-sticky').addClass('scrolling');
    } else {
      $('.site-header-sticky').removeClass('scrolling');
    }
    if ($(window).scrollTop() >= 200) {
      $('.site-header-sticky.scrolling').addClass('reveal-header');
    } else {
      $('.site-header-sticky.scrolling').removeClass('reveal-header');
    }
  });

  //  OnePage Active Class
  $(document).ready(function () {
    $('#nav-one-page').onePageNav({
      currentClass: 'current-menu',
      changeHash: false,
      easing: 'swing',
    });
  });

  // Popup
  $(document).ready(function () {
    $('.modal-popup').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-mfp',
      callbacks: {
        beforeOpen: function() {
          var $trigger = $(this.st.el);
          var $parent = $trigger.closest('.project-item, .service-item');
          var $popup = $('#popup');
          
          if ($parent.length) {
            var title = $parent.attr('data-title') || '';
            var category = $parent.attr('data-category') || '';
            var timeframe = $parent.attr('data-timeframe') || '';
            var desc = $parent.attr('data-description') || '';
            var bullets = $parent.attr('data-bullets') || '';
            
            $popup.find('.project-details h3').text(title);
            $popup.find('.project-details p').text(desc);
            
            // Update client metadata elements
            var $meta = $popup.find('.project-client-meta');
            var label = $parent.hasClass('service-item') ? 'Tools/Focus:' : 'Timeframe:';
            $meta.html(
              '<div class="client-meta"><p>Category:</p><h6>' + category + '</h6></div>' +
              '<div class="client-meta"><p>' + label + '</p><h6>' + timeframe + '</h6></div>'
            );
            
            // Update thumbnail image with the same relative image on the page
            var imgSrc = $parent.find('img').attr('src') || '';
            if (imgSrc) {
              $popup.find('.thumbnail-wrapper img').attr('src', imgSrc);
            }
            
            // Hide static template placeholder sub-images
            $popup.find('.other-project-img').hide();
            
            // Update bullets
            var $ul = $popup.find('.project-details ul');
            $ul.empty();
            if (bullets) {
              bullets.split(';').forEach(function(bullet) {
                if (bullet.trim()) {
                  $ul.append('<li>' + bullet.trim() + '</li>');
                }
              });
            }
          }
        }
      }
    });
  });

  // Testimonial Slider
  $('.testimonial-slider').owlCarousel({
    loop: true,
    autoplay: true,
    smartSpeed: 1500,
    margin: 50,
    dots: true,
    dotsEach: true,
    nav: false,

    responsive: {
      0: { items: 1 },
      480: { items: 1 },
      768: { items: 2 },
      1040: { items: 2 },
      1200: { items: 3 },
      1600: { items: 3 },
      1920: { items: 3 },
    },
  });

  // Brands Slider
  $('.brands-slider').owlCarousel({
    items: 5,
    loop: true,
    autoplay: true,
    smartSpeed: 1500,
    margin: 100,
    responsive: {
      0: { items: 2 },
      480: { items: 2 },
      768: { items: 3 },
      1040: { items: 4 },
      1200: { items: 5 },
      1600: { items: 5 },
      1920: { items: 5 },
    },
  });
})(jQuery);
