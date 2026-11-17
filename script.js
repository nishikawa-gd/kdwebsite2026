document.addEventListener('DOMContentLoaded', function () {

    const list = document.querySelector('.swiper-list');
    const swiperWindow = document.querySelector('.swiper-window');
    const next = document.querySelector('.next');
    const back = document.querySelector('.back');
    const dots = document.querySelectorAll('.dot');

    // 元の3枚を取得
    const slides = list.innerHTML;

    // 3枚 × 3セット
    list.innerHTML = slides + slides + slides;

    const firstImage = list.querySelector('img');


    function startSlider() {

        // 1枚目の画像の実際の表示幅
        const slideWidth = firstImage.getBoundingClientRect().width;

        // 表示する窓を1枚分にする
        swiperWindow.style.width = slideWidth + 'px';

        // 真ん中のセットからスタート
        let current = 3;

        list.style.transform =
            `translateX(-${current * slideWidth}px)`;


        // 丸の色を変更
        function updateDots() {

            let index = current % 3;

            if (index < 0) {
                index += 3;
            }

            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === index);
            });

        }


        // 次へ
        next.addEventListener('click', function () {

            current++;

            list.style.transition = 'transform 0.4s ease';

            list.style.transform =
                `translateX(-${current * slideWidth}px)`;

            updateDots();


            // 3枚進んだら真ん中へ戻す
            if (current === 6) {

                setTimeout(function () {

                    list.style.transition = 'none';

                    current = 3;

                    list.style.transform =
                        `translateX(-${current * slideWidth}px)`;

                }, 400);
            }

        });


        // 戻る
        back.addEventListener('click', function () {

            current--;

            list.style.transition = 'transform 0.4s ease';

            list.style.transform =
                `translateX(-${current * slideWidth}px)`;

            updateDots();


            // 3枚戻ったら真ん中へ
            if (current === 0) {

                setTimeout(function () {

                    list.style.transition = 'none';

                    current = 3;

                    list.style.transform =
                        `translateX(-${current * slideWidth}px)`;

                }, 400);
            }

        });

    }


    // 画像の読み込みが終わってから開始
    if (firstImage.complete) {
        startSlider();
    } else {
        firstImage.addEventListener('load', startSlider);
    }

});