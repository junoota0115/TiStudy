$(document).ready(function(){
    var $sliderNavImages = $('.slider-nav img');
    $sliderNavImages.eq(0).addClass('selected-image');
    var $sliderFor = $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    var $sliderNav = $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        asNavFor: '.slider-for',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
    });

    // 画像がクリックされたときの処理
    $sliderNavImages.click(function() {
        // すべての画像から枠線を削除
        $sliderNavImages.removeClass('selected-image');
        // クリックされた画像に枠線を追加
        $(this).addClass('selected-image');

        // クリック時にautoplayを再開
        $sliderFor.slick('slickPlay');
    });

    // Autoplayの場合、スライドが切り替わるたびに枠線を更新
    $sliderFor.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $sliderNavImages.removeClass('selected-image');
        $sliderNavImages.eq(nextSlide).addClass('selected-image');
    });


});

$(document).ready(function(){
$sliderMain = $('.slider-main').slick({
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
});
});