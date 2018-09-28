$(document).ready(function() {
    smoothScroll(1000);
    workBelt();
    workLoad();
    clientStuff();
    jQuery("#heroText").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
});

function smoothScroll(duration) {
    $('a[href^="#"]').on('click', function(event) {
        var target = $($(this).attr('href'));
     
        if(target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function workBelt() {
    $('.thumbUnit').click(function() {
        $('.workBelt').css('left','-100%');
        $('.workContainer').show();
    });

    $('.workReturn').click(function() {
        $('.workBelt').css('left','0%');
        $('.workContainer').hide();
    });
}

function workLoad() {
    $.ajaxSetup({ cache: true });

    $('.thumbUnit').click(function() {
        var newTitle = $(this).find('strong').text(),
            newFolder = $(this).data('folder'),
            spinner = '<div class="loader">Loading...</div>',
            newHTML = 'work/'+newFolder+'.html';

        $('.projectLoad').html(spinner).load(newHTML);
        $('.projectTitle').text(newTitle);
    });
}

function clientStuff() {
    $('.clientUnit').first().addClass('activeClient');
    $('.clientLogo').first().addClass('activeClient');
    $('.clientsMobileNav span').first().addClass('activeClient');

    $('.clientLogo, .clientsMobileNav span').click(function() {
        var siblings = $(this).parent().children(),
            position = siblings.index($(this));

        $('.clientUnit').removeClass('activeClient').eq(position).addClass('activeClient');
        siblings.removeClass('activeClient');
        $(this).addClass('activeClient');
    });

    $('.clientControlNext').click(function() {
        var curActiveClient = $('.clientsBelt').find('.activeClient'),
            position = $('.clientsBelt').children().index(curActiveClient),
            clientNum = $('.clientUnit').length;

        if(position < clientNum - 1) {
            $('.activeClient').removeClass('activeClient').next().addClass('activeClient');
        } else {
            $('.clientUnit').removeClass('activeClient').first().addClass('activeClient');
            $('.clientLogo').removeClass('activeClient').first().addClass('activeClient');
        }
    });

    $('.clientControlPrev').click(function() {
        var curActiveClient = $('.clientsBelt').find('.activeClient'),
            position = $('.clientsBelt').children().index(curActiveClient);

        if(position > 0) {
            $('.activeClient').removeClass('activeClient').prev().addClass('activeClient');
        } else {
            $('.clientUnit').removeClass('activeClient').last().addClass('activeClient');
            $('.clientLogo').removeClass('activeClient').last().addClass('activeClient');
        }
    });
}

(function( $ ){

    $.fn.fitText = function( kompressor, options ) {
  
      // Setup options
      var compressor = kompressor || 1,
          settings = $.extend({
            'minFontSize' : Number.NEGATIVE_INFINITY,
            'maxFontSize' : Number.POSITIVE_INFINITY
          }, options);
  
      return this.each(function(){
  
        // Store the object
        var $this = $(this);
  
        // Resizer() resizes items based on the object width divided by the compressor * 10
        var resizer = function () {
          $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        };
  
        // Call once to set.
        resizer();
  
        // Call on resize. Opera debounces their resize by default.
        $(window).on('resize.fittext orientationchange.fittext', resizer);
  
      });
  
    };
  
  })( jQuery );