// Slick
$(function() {
    $('.js-intro-slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        arrows: false,
        swipe: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
});

$(function() {
    $('.js-image-slider').slick({
        autoplay: true,
        autoplaySpeed: 8000,
        dots: true,
        arrows: false,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
});

$(function() {
    $('.js-banner-slider').slick({
        dots: false,
        arrows: true,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
});

// Organic Tabs
$(function() {
    $(".js-tabs").organicTabs();
});

// Match Height
$(function() {
    $('.p-grid-caption').matchHeight();
});

// Accordion
// $(function() {
//     $(".js-dropdown__genre, .js-dropdown__distance").hide();
//     $(".p-btn-genre").click(function() {
//         $(".p-btn-genre").prev().slideToggle(300);
//         $(this).toggleClass("close");
//     });
//     $(".p-btn-distance").click(function() {
//         $(".p-btn-distance").prev().slideToggle(300);
//         $(this).toggleClass("close");
//     });
// });

// $(function() {
//     $('.p-accordion__content').hide();
//     $('.p-accordion__open').click(function () {
//         $(this).next('.p-accordion__content').slideToggle(300).siblings('.p-accordion__content').slideUp(300);
//         $(this).siblings('.p-accordion__open').removeClass('active');
//         $(this).toggleClass('active');
//     });
// });