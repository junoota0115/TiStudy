$(document).ready(function(){
    var $sliderNavImages = $('.slider-nav img');
    $sliderNavImages.eq(0).addClass('selected-image');
    var $sliderFor = $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,

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

$(document).ready(function () {
  var $sliderMain = $('.slider-main');
  var $iframeVideos = $sliderMain.find('iframe');
  var isVideoPlaying = false;

  // スライダーの初期化
  $sliderMain.slick({
    centerMode: true,
    centerPadding: '350px',
    dots: true,
    autoplay: true, // 自動再生を無効化
    autoplaySpeed: 7000,
    slidesToShow: 1,
    prevArrow: $('.custom-prev-arrow'), // カスタム矢印を指定
    nextArrow: $('.custom-next-arrow'), // カスタム矢印を指定
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 280,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '100px',
          slidesToShow: 1
        }
      }
    ]
  });


  $iframeVideos.on('play', function () {
    isVideoPlaying = true;
  });

  $iframeVideos.on('pause ended', function () {
    isVideoPlaying = false;
    // 動画が停止したら、autoplayを有効にする
    $sliderMain.slick('slickPlay');
  });

  // スライダーの前後矢印がクリックされたときのイベント
  $sliderMain.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // 動画が再生中でない場合、スライド切り替えを許可する
    if (!isVideoPlaying) {
      return true;
    }
    // 動画が再生中の場合、スライド切り替えをキャンセル
    event.preventDefault();
  });
});
