$(function () {
  $('.js-open').click(function () {
    $("body").addClass("no_scroll"); // 背景固定させるクラス付与
    var id = $(this).data('id'); // 何番目のキャプション（モーダルウィンドウ）か認識
    $('#overlay, .modal-window[data-id="modal' + id + '"]').fadeIn();
  });
  // オーバーレイクリックでもモーダルを閉じるように
  $('.js-close , #overlay').click(function () {
    $("body").removeClass("no_scroll"); // 背景固定させるクラス削除
    $('#overlay, .modal-window').fadeOut();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.about_box > li');

  const options = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 画面下に少し入ったら発火
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        obs.unobserve(entry.target); // 一度表示されたら監視解除
      }
    });
  }, options);

  targets.forEach(target => {
    observer.observe(target);
  });
});


