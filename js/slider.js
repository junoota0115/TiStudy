$(document).ready(function(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav',
        // prevArrow:'<button type="button" class="prev">戻す</button>',
        });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        arrows: false,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 2000,
        });

        $('.slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var selectedImageSrc = $('.slider-nav div:nth-child(' + (nextSlide + 1) + ') img').attr('src');
    $('.selected-image-container img').attr('src', selectedImageSrc);
});
    });