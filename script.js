window.addEventListener("load", () => {

    const images = document.querySelectorAll(".mainvisual img");

    images.forEach((image, index) => {

        setTimeout(() => {
            image.classList.add("show");
        }, index * 150);

    });

});
// イベントスライド
window.addEventListener("load", () => {

    const eventContent = document.querySelector(".event-content");
    const eventItems = document.querySelectorAll(".event-item");

    // カード1枚分の移動距離
    const itemWidth = eventItems[0].offsetWidth;
    const gap = 60;
    const moveX = itemWidth + gap;

    function slideEvent() {

        // 1枚分左へスライド
        eventContent.style.transition = "transform 0.8s ease";
        eventContent.style.transform = `translateX(-${moveX}px)`;

        setTimeout(() => {

            // 一番左のカードを最後へ移動
            const firstItem = eventContent.firstElementChild;
            eventContent.appendChild(firstItem);

            // 位置をリセット
            eventContent.style.transition = "none";
            eventContent.style.transform = "translateX(0)";

        }, 800);
    }

    // 3秒止まってから次へ
    setInterval(slideEvent, 3800);

});
//担当紹介
window.addEventListener("load", () => {

    const teacherList = document.querySelector(".teacher-list");
    const teacherNext = document.querySelector(".teacher-next");
    const teacherPrev = document.querySelector(".teacher-prev");

    // 先生1人分＋隙間
    const moveX = 316;

    // 真ん中の先生を大きくする

    function updateCenter() {

        const items = teacherList.querySelectorAll(".teacher-item");

        items.forEach((item) => {
            item.classList.remove("is-center");
        });

        // 常に2番目を真ん中にする
        items[1].classList.add("is-center");
    }


    // 次へteacher_btn2

    teacherNext.addEventListener("click", () => {

        // 真ん中を次の先生に変更
        const items = teacherList.querySelectorAll(".teacher-item");

        items.forEach((item) => {
            item.classList.remove("is-center");
        });

        items[2].classList.add("is-center");


        // 左へスライド
        teacherList.style.transition = "transform 0.6s ease";
        teacherList.style.transform = `translateX(-${moveX}px)`;


        // スライドが終わったら
        setTimeout(() => {

            // 一番左の先生を一番右へ移動
            const firstItem = teacherList.firstElementChild;
            teacherList.appendChild(firstItem);

            // 移動位置をリセット
            teacherList.style.transition = "none";
            teacherList.style.transform = "translateX(0)";

            // 真ん中を更新
            updateCenter();

        }, 600);

    });


        // 前へteacher_btn1

    teacherPrev.addEventListener("click", () => {

        // 一番右の先生を一番左へ移動
        const lastItem = teacherList.lastElementChild;
        teacherList.insertBefore(lastItem, teacherList.firstElementChild);


        // 一瞬だけ左にずらしておく
        teacherList.style.transition = "none";
        teacherList.style.transform = `translateX(-${moveX}px)`;


        // 真ん中の先生を更新
        updateCenter();


        // ブラウザに位置を認識させる
        teacherList.offsetHeight;


        // 右へスライド
        teacherList.style.transition = "transform 0.6s ease";
        teacherList.style.transform = "translateX(0)";

    });


    // 最初の状態
    updateCenter();

});
document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    const menuClose = document.getElementById("menuClose");


    // MENUを押したとき
    menuBtn.addEventListener("click", function () {

        menu.classList.add("active");

    });


    // ×を押したとき
    menuClose.addEventListener("click", function () {

        menu.classList.remove("active");

    });

});

// TOPへ戻るボタン
const pageTop = document.querySelector(".page-top");

pageTop.addEventListener("click", function (e) {
    e.preventDefault();

    const start = window.scrollY;
    const duration = 1500;
    const startTime = performance.now();

    function scrollToTop(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, start * (1 - progress));

        if (progress < 1) {
            requestAnimationFrame(scrollToTop);
        }
    }

    requestAnimationFrame(scrollToTop);
});