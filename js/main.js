(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Keep the mobile navigation toggle accessible on every page.
    $('.navbar-toggler').attr({
        'aria-label': 'Toggle navigation',
        'aria-controls': 'navbarCollapse',
        'aria-expanded': 'false'
    });
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Close the expanded navigation after a destination or language is selected on mobile.
    $('#navbarCollapse a').on('click', function () {
        var href = $(this).attr('href');
        if (window.innerWidth < 992 && href && href !== '#' && $('#navbarCollapse').hasClass('show')) {
            bootstrap.Collapse.getOrCreateInstance(document.getElementById('navbarCollapse'), {toggle: false}).hide();
        }
    });

    // Floating WhatsApp shortcut available from every page.
    if (!$('.whatsapp-contact').length) {
        $('<a>', {
            class: 'whatsapp-contact',
            href: 'https://wa.me/251911143893?text=' + encodeURIComponent('Hello Abaynesh Dairy Farm, I would like more information.'),
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Chat with Abaynesh Dairy Farm on WhatsApp'
        }).html('<i class="fab fa-whatsapp" aria-hidden="true"></i>').appendTo('body');
    }

    // Floating Telegram shortcut using the farm's published phone number.
    if (!$('.telegram-contact').length) {
        $('<a>', {
            class: 'telegram-contact',
            href: 'https://t.me/+251911143893?text=' + encodeURIComponent('Hello Abaynesh Dairy Farm, I would like more information.'),
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'Chat with Abaynesh Dairy Farm on Telegram'
        }).html('<i class="fab fa-telegram-plane" aria-hidden="true"></i>').appendTo('body');
    }


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Category filters on the gallery page.
    $('.gallery-filter-btn').on('click', function () {
        var filter = $(this).data('filter');
        $('.gallery-filter-btn').removeClass('active').attr('aria-pressed', 'false');
        $(this).addClass('active').attr('aria-pressed', 'true');

        $('.gallery-filter-item').each(function () {
            var visible = filter === 'all' || $(this).data('category') === filter;
            $(this).toggleClass('d-none', !visible);
        });
    });

    
})(jQuery);
