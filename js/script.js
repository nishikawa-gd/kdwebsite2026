// ローディング
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loading").classList.add("hide");
    }, 1000); // 1秒ってこと!
});



// 共通 - マーキー //
const marquees = document.querySelectorAll('.cmp-marquee');
marquees.forEach((marquee) => {

    const marqueeTrack = marquee.querySelector('.cmp-marquee-track');
    const marqueeItem = marqueeTrack.querySelector('p');

    // コース紹介の縦マーキー
    if (marquee.classList.contains('sd-marquee')) {

        marqueeTrack.style.display = 'flex';
        marqueeTrack.style.flexDirection = 'column';
        const marqueeHeight = marquee.offsetHeight;

        // 縦方向に数を複製
        while (marqueeTrack.scrollHeight < marqueeHeight * 2) {
            marqueeTrack.appendChild(marqueeItem.cloneNode(true));
        }
        const gap = parseFloat(getComputedStyle(marqueeTrack).gap) || 0;
        const moveDistance = marqueeItem.offsetHeight + gap;

        // 01：上から下
        if (marquee.id === 'sd-marquee01') {
            gsap.set(marqueeTrack, {
                y: -moveDistance
            });

            gsap.to(marqueeTrack, {
                y: 0,
                ease: 'none',
                repeat: -1,
                duration: 26,
            });
        }

        // 02：下から上
        else if (marquee.id === 'sd-marquee02') {
            gsap.to(marqueeTrack, {
                y: -moveDistance,
                ease: 'none',
                repeat: -1,
                duration: 26,
            });
        }
        return;
    }


    // 横マーキー
    const marqueeWidth = marquee.offsetWidth;
    while (marqueeTrack.scrollWidth < marqueeWidth * 2) {
        marqueeTrack.appendChild(marqueeItem.cloneNode(true));
    }

    gsap.to(marqueeTrack, {
        x: -marqueeItem.offsetWidth,
        ease: 'none',
        repeat: -1,
        duration:
            marquee.id === 'f-marquee' || marquee.id === 'ds-marquee' ? 36 : 14,  // フッター・スケジュールなら36秒、それ以外（メイン）なら14秒
    });
});


// topへ戻る
const upBtn = document.querySelector('#up_btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        upBtn.classList.add('is-show');
    } else {
        upBtn.classList.remove('is-show');
    }
});

upBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// メインビジュアル - 無限スクロール
const visual = document.querySelector('#m-visual');
const visualTrack = document.querySelector('#m-visual-track');
const visualItem = visualTrack.querySelector('img');

visualTrack.appendChild(visualItem.cloneNode(true)); // pngを複製

// png1枚分の幅だけ左へ動かす
gsap.to(visualTrack, {
    x: -visualItem.offsetWidth,
    ease: 'none',
    repeat: -1,
    duration: 100,  // ここ秒数！遅い方が可愛いかも
});





// // ハンバーガー - 開閉ボタン
// const openBtn = document.getElementById("mv-openbtn");
// const closeBtn = document.getElementById("hm-closebtn");
// const menu = document.getElementById("hamburger-menu-info");

// // 開く
// openBtn.addEventListener("click", function () {
//     menu.classList.add("is-open");
// });

// // 閉じる
// closeBtn.addEventListener("click", function () {
//     menu.classList.remove("is-open");
// });

// // メニュー内をクリックしたら閉じる
// menu.addEventListener("click", function () {
//     menu.classList.remove("is-open");
// });


// ハンバーガー - 開閉ボタン
const openBtn = document.getElementById("mv-openbtn");
const menu = document.getElementById("hamburger-menu-info");

// 開閉
openBtn.addEventListener("click", function () {
    menu.classList.toggle("is-open");
    openBtn.classList.toggle("is-open");
});

// メニュー内をクリックしたら閉じる
menu.addEventListener("click", function () {
    menu.classList.remove("is-open");
    openBtn.classList.remove("is-open");
});





// main - 1日のスケジュール
document.addEventListener("DOMContentLoaded", () => {

    const scheduleItems = document.querySelectorAll(".ds-texts li");
    const textsBox = document.querySelector(".ds-texts");
    const titleTime = document.querySelector(".ds-title span");
    const titleText = document.querySelector(".ds-title p");
    const hashtag01 = document.querySelector(".ds-hashtag span:nth-child(1)");
    const hashtag02 = document.querySelector(".ds-hashtag span:nth-child(2)");
    const pictures = document.querySelectorAll(".ds-pic");

    // スケジュールごとの表示内容
    const scheduleData = {
        "0910": {
            time: "9:10",
            title: "登校",
            hashtag01: "#清々しい朝！",
            hashtag02: "#登校"
        },

        "0920": {
            time: "9:20",
            title: "1時間目",
            hashtag01: "#グラフィック",
            hashtag02: "#1限目"
        },

        "1020": {
            time: "10:20",
            title: "2時間目",
            hashtag01: "#グラフィック",
            hashtag02: "#2限目"
        },

        "1120": {
            time: "11:20",
            title: "3時間目",
            hashtag01: "#Webコーディング",
            hashtag02: "#3限目"
        },

        "1210": {
            time: "12:10",
            title: "お昼ご飯",
            hashtag01: "#お昼休み♪",
            hashtag02: "#ランチ"
        },

        "1310": {
            time: "13:10",
            title: "4時間目",
            hashtag01: "#Webコーディング",
            hashtag02: "#4限目"
        },

        "1410": {
            time: "14:10",
            title: "5時間目",
            hashtag01: "#動画",
            hashtag02: "#5限目"
        },

        "1600": {
            time: "16:00",
            title: "6時間目",
            hashtag01: "#動画",
            hashtag02: "#6限目"
        }
    };


    // 表示を切り替える関数
    function changeSchedule(id) {

        const data = scheduleData[id];
        if (!data) return;

        // タイトル変更
        titleTime.textContent = data.time;
        titleText.textContent = data.title;

        // ハッシュタグ変更
        hashtag01.textContent = data.hashtag01;
        hashtag02.textContent = data.hashtag02;

        // 画像変更
        pictures.forEach((pic) => {
            pic.classList.remove("is-active");
        });

        const currentPic = document.querySelector(`#ds-pic-${id}`);
        if (currentPic) {
            currentPic.classList.add("is-active");
        }


        // 現在位置の丸
        scheduleItems.forEach((item) => {
            item.classList.remove("is-active");
        });

        const currentItem = document.querySelector(`#ds-time-${id}`);
        if (currentItem) {
            currentItem.classList.add("is-active");
        }
    }


    // ds-texts内のスクロール監視
    function checkSchedule() {
        const boxTop = textsBox.getBoundingClientRect().top;
        let currentId = null;
        scheduleItems.forEach((item) => {

            const itemTop = item.getBoundingClientRect().top;

            // ds-textsの上端より120px手前で切り替える
            if (itemTop <= boxTop + 120) {
                currentId = item.id.replace("ds-time-", "");
            }

        });

        if (currentId) {
            changeSchedule(currentId);
        }
    }


    // ds-textsの中のスクロールを監視
    textsBox.addEventListener("scroll", checkSchedule);  // ここ1回サイト全体のスクロールで影響を受ける形になってた！勉強になった！これ卒制でも活かしたい！

    // 最初の状態
    changeSchedule("0910");
});





// 数字で見る - スライダー
document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector(".md-slides");
    const originalSlides = Array.from(
        document.querySelectorAll(".mds-item")
    );
    const texts = Array.from(
        document.querySelectorAll(".mdt-item")
    );
    const dots = Array.from(
        document.querySelectorAll(".mdp-item")
    );
    const backBtn = document.querySelector("#mdb-back");
    const nextBtn = document.querySelector("#mdb-next");
    const slider = document.querySelector(".md-slider");


    // 基本の設定
    const slideCount = originalSlides.length;
    let currentIndex = slideCount;
    let isAnimating = false;
    let autoSlide;


    // スライドを複製
    const firstSet = originalSlides.map((slide) => {
        return slide.cloneNode(true);
    });

    const secondSet = originalSlides.map((slide) => {
        return slide.cloneNode(true);
    });


    // 元の中身を空にする
    slidesContainer.innerHTML = "";


    // 3セット並べる
    [
        ...firstSet,
        ...originalSlides,
        ...secondSet
    ].forEach((slide) => {
        slidesContainer.appendChild(slide);
    });


    // 複製後の全スライド
    const slides = Array.from(
        slidesContainer.querySelectorAll(".mds-item")
    );


    // ベースの01〜06番号を取得？してるはず
    function getLogicalIndex(index) {
        return (
            ((index % slideCount) + slideCount)
            % slideCount
        );
    }


    // アクティブ状態を更新
    function updateActive() {
        const logicalIndex =
            getLogicalIndex(currentIndex);

        // 画像
        slides.forEach((slide, index) => {
            slide.classList.toggle(
                "is-active",
                index === currentIndex
            );
        });


        // ページネーション
        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "is-active",
                index === logicalIndex
            );
        });
    }



    function moveSlider(animate = true) {

        const activeSlide = slides[currentIndex];

        if (!activeSlide) return;

        const sliderRect =
            slider.getBoundingClientRect();

        const slideRect =
            activeSlide.getBoundingClientRect();

        const slideCenter =
            slideRect.left + slideRect.width / 2;

        const sliderCenter =
            sliderRect.left + sliderRect.width / 2;

        const currentX =
            gsap.getProperty(slidesContainer, "x") || 0;

        const targetX =
            currentX + (sliderCenter - slideCenter);


        if (animate) {

            gsap.to(slidesContainer, {
                x: targetX,
                duration: 0.55,
                ease: "power2.out"
            });

        } else {

            gsap.set(slidesContainer, {
                x: targetX
            });

        }
    }


    // テキストの切り替え
    function changeText(newIndex) {

        const logicalIndex =
            getLogicalIndex(newIndex);

        const nextText =
            texts[logicalIndex];


        // 現在表示されている文章
        const currentText =
            texts.find((text) => {
                return (
                    gsap.getProperty(text, "opacity")
                    > 0.5
                );
            });


        // 同じ文章なら何もしない
        if (currentText === nextText) {
            return;
        }


        // テキストをフェードアウト
        if (currentText) {

            gsap.to(currentText, {

                opacity: 0,

                duration: 0.2,

                ease: "power2.out"

            });

        }


        // 次の文章をフェードイン
        gsap.fromTo(

            nextText,

            {
                opacity: 0
            },

            {
                opacity: 1,

                duration: 0.3,

                delay: 0.15,

                ease: "power2.out"

            }

        );

    }


    // // 無限ループ用の位置調整
    // function checkInfiniteLoop() {

    //     /*
    //      * 初手に3セットあって
    //      *
    //      * 01 02 03 04 05 06
    //      * 01 02 03 04 05 06 ← ここのセットを基準点にする感じ
    //      * 01 02 03 04 05 06
    //      *
    //      */


    //     // 右端へ近づいた場合
    //     if (currentIndex >= slideCount * 2) {
    //         const logicalIndex =
    //             getLogicalIndex(currentIndex);

    //         // 真ん中の同じ番号に戻す
    //         currentIndex =
    //             slideCount + logicalIndex;

    //         updateActive();
    //         moveSlider(false);
    //     }


    //     // 左端へ近づいた場合
    //     if (currentIndex < slideCount) {
    //         const logicalIndex =
    //             getLogicalIndex(currentIndex);

    //         // 真ん中の同じ番号へ戻す
    //         currentIndex =
    //             slideCount + logicalIndex;

    //         updateActive();
    //         moveSlider(false);
    //     }
    // }


    function checkInfiniteLoop() {

        if (currentIndex >= slideCount * 2) {

            const logicalIndex =
                getLogicalIndex(currentIndex);

            currentIndex =
                slideCount + logicalIndex;

            updateActive();

            // 現在のGSAPアニメーションを完全に停止
            gsap.killTweensOf(slidesContainer);

            // 真ん中の同じスライドへ瞬間移動
            moveSlider(false);
        }

        if (currentIndex < slideCount) {

            const logicalIndex =
                getLogicalIndex(currentIndex);

            currentIndex =
                slideCount + logicalIndex;

            updateActive();

            gsap.killTweensOf(slidesContainer);

            moveSlider(false);
        }
    }


    // // スライド切り替え
    // function changeSlide(newIndex) {

    //     // アニメーション中なら操作しない
    //     if (isAnimating) {
    //         return;
    //     }

    //     isAnimating = true;
    //     currentIndex = newIndex;
    //     changeText(currentIndex);

    //     updateActive();
    //     moveSlider(true);


    //     // アニメーション終了後
    //     gsap.delayedCall(0.65, () => {

    //         /* 端まで来てたら同じ番号の真ん中のスライドに戻る感じ */
    //         checkInfiniteLoop();
    //         isAnimating = false;
    //     });
    // }




    function changeSlide(newIndex) {

        if (isAnimating) {
            return;
        }

        isAnimating = true;

        currentIndex = newIndex;

        changeText(currentIndex);
        updateActive();

        const activeSlide = slides[currentIndex];

        if (!activeSlide) {
            isAnimating = false;
            return;
        }

        const sliderWidth = slider.offsetWidth;
        const slideLeft = activeSlide.offsetLeft;
        const slideWidth = activeSlide.offsetWidth;

        const targetX =
            (sliderWidth / 2)
            - slideLeft
            - (slideWidth / 2);

        gsap.to(slidesContainer, {
            x: targetX,
            duration: 0.55,
            ease: "power2.out",

            onComplete: () => {

                checkInfiniteLoop();

                isAnimating = false;
            }
        });
    }





    // 次へ
    function nextSlide() {
        changeSlide(
            currentIndex + 1
        );
    }

    // 前へ
    function prevSlide() {
        changeSlide(
            currentIndex - 1
        );
    }


    // 次へボタン
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });


    // 戻るボタン
    backBtn.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });


    // ページネーション
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            if (isAnimating) {
                return;
            }

            stopAutoSlide();

            const logicalIndex =
                getLogicalIndex(currentIndex);


            /*
             * 今いる場所から
             * 一番近い同じ番号へ移動する
             */

            let targetIndex =
                currentIndex
                - logicalIndex
                + index;


            const difference =
                targetIndex
                - currentIndex;


            // 後ろに回った方が近い場合
            if (
                difference
                > slideCount / 2
            ) {
                targetIndex -= slideCount;
            }


            // 前に回った方が近い場合
            if (
                difference
                < -slideCount / 2
            ) {
                targetIndex += slideCount;
            }
            changeSlide(targetIndex);
            startAutoSlide();
        });
    });


    // 自動スライド開始
    function startAutoSlide() {

        stopAutoSlide();

        autoSlide = gsap.delayedCall(
            3,
            () => {
                nextSlide();
                startAutoSlide();
            }
        );
    }


    // 自動スライド停止
    function stopAutoSlide() {
        if (autoSlide) {
            autoSlide.kill();
            autoSlide = null;
        }
    }


    // 初期設定
    const initialIndex = 0;


    // 画像
    slides.forEach((slide) => {

        slide.classList.remove(
            "is-active"
        );

    });
    slides[currentIndex].classList.add(
        "is-active"
    );


    // テキスト
    gsap.set(texts, {
        opacity: 0
    });
    gsap.set(texts[initialIndex], {
        opacity: 1
    });


    // ページネーション
    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "is-active",
            index === initialIndex
        );
    });


    moveSlider(false);
    startAutoSlide();
});





// 教職員図鑑 - ボタン動作
const cards = document.querySelectorAll(".td-cardinfo");
const current = document.querySelector(".td-current");
const back = document.querySelector(".td-back");
const next = document.querySelector(".td-next");

let index = 0;

function showCard() {
    cards.forEach(card => {
        card.classList.remove("active");
    });

    cards[index].classList.add("active");

    current.textContent = index + 1;
}

// 次へ
next.addEventListener("click", () => {
    index++;

    if (index >= cards.length) {
        index = 0;
    }

    showCard();
});

// 戻る
back.addEventListener("click", () => {
    index--;

    if (index < 0) {
        index = cards.length - 1;
    }

    showCard();
});




// こっからスクロールリビール
// ScrollReveal().reveal(
//     '.md-btns, .md-slides, .md-text, .md-pagination',
//     {
//         reset: false,
//         duration: 400,
//         distance: '0px',
//         easing: 'ease-out',
//         interval: 200,
//         opacity: 0
//     }
// );


// ScrollReveal().reveal(
//     'h2',
//     {
//         reset: false,      // スクロール戻しても再実行しない!
//         distance: '40px',  // 下からどれくらい動くか
//         duration: 300,     // ふわっとする長さ
//         easing: 'ease-out',
//         origin: 'bottom',
//         opacity: 0
//     }
// );


// ScrollReveal().reveal(
//     '.cd-item',
//     {
//         reset: false,
//         distance: '40px',
//         duration: 300,
//         easing: 'ease-out',
//         origin: 'bottom',
//         opacity: 0
//     }
// );



// スクロールアニメーション ぷにっとするやつ

const targets = document.querySelectorAll(
    '.ad-pic-girl01, ' +
    '.ad-pic-girl02, ' +
    '.ad-pic-boy01, ' +
    '#ap-01 .ap-textimg img, ' +
    '#ap-02 .ap-textimg img, ' +
    '#latest-news h4, ' +
    '.ds-texts-wrapper, ' +
    '#sv-gd-KR, ' +
    '#sv-gd-TD, ' +
    '#sv-web-KH, ' +
    '#sv-web-MH, ' +
    '#sv-mov-OH, ' +
    '#sv-mov-KK, ' +
    '.cd-item, ' +
    '.sd-deco-wrap'
);


const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            // 疑似要素を持つ要素
            if (
                entry.target.classList.contains('sd-deco-wrap') ||
                entry.target.classList.contains('ds-texts-wrapper')
            ) {
                entry.target.classList.add('deco-visible');

            } else {
                entry.target.classList.add('is-visible');
            }

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.1
});

targets.forEach((target) => {
    observer.observe(target);
});