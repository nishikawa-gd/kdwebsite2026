document.addEventListener('DOMContentLoaded', () => {
    // 企業カードの開閉
    document.querySelectorAll('.corporate_plus_btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const card = button.closest(
                '.corporate_content_01, ' +
                '.corporate_content_02, ' +
                '.corporate_content_03, ' +
                '.corporate_content_04, ' +
                '.corporate_card'
            );

            if (card) {
                card.classList.toggle('is-open');
            }
        });
    });

    // FAQの開閉
    document.querySelectorAll('.faq_q').forEach((question) => {
        question.addEventListener('click', () => {
            const faqBox = question.parentElement;
            if (!faqBox) return;

            faqBox.classList.toggle('is-open');
            question.setAttribute(
                'aria-expanded',
                faqBox.classList.contains('is-open')
            );
        });
    });

    // タイプライター表示の準備
    document.querySelectorAll('.sd_time_list_read_3').forEach((paragraph) => {
        const copy = paragraph.cloneNode(true);

        // HTMLのbrを改行文字に変換
        copy.querySelectorAll('br').forEach((br) => {
            br.replaceWith('\n');
        });

        const text = copy.textContent
            .replace(/[ \t]*\n[ \t]*/g, '\n')
            .trim();

        const content = document.createElement('span');
        content.className = 'typewriter-content';
        content.textContent = '';

        paragraph.replaceChildren(content);
        paragraph.dataset.typewriterText = text;
    });

    // スクロールで表示する要素
    const targets = document.querySelectorAll(
        '.fade-in, ' +
        '.scale-up, ' +
        '.sd_dc_1_1, .sd_dc_1_2, ' +
        '.sd_dc_2_1, .sd_dc_2_2, ' +
        '.sd_dc_3_1, .sd_dc_3_2, ' +
        '.sd_dc_4_1, .sd_dc_4_2, ' +
        '.sd_dc_5_1, .sd_dc_5_2, ' +
        '.sd_dc_1_3, .sd_dc_2_3, .sd_dc_3_3, .sd_dc_4_3, ' +
        '.sd_time_list_read_2, ' +
        '.sd_time_list_read_3'
    );

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    // 時間の説明文を1文字ずつ表示
    const startTypewriter = (paragraph) => {
        const content = paragraph.querySelector('.typewriter-content');
        const characters = Array.from(
            paragraph.dataset.typewriterText || ''
        );

        if (!content) return;

        if (prefersReducedMotion) {
            content.textContent = characters.join('');
            return;
        }

        let index = 0;

        const typeNextCharacter = () => {
            if (index >= characters.length) return;

            content.textContent += characters[index];
            index += 1;
            window.setTimeout(typeNextCharacter, 45);
        };

        typeNextCharacter();
    };

    // 対象を表示状態にする
    const showTarget = (target) => {
        target.classList.add('is-show', 'is-active');

        if (target.matches('.sd_time_list_read_2')) {
            target.classList.add('is-animated');
        }

        if (target.matches('.sd_time_list_read_3')) {
            startTypewriter(target);
        }
    };

    // IntersectionObserver非対応環境ではすべて表示
    if (!('IntersectionObserver' in window)) {
        targets.forEach(showTarget);
        return;
    }

    // 画面に入った要素を一度だけ表示
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            showTarget(entry.target);
            currentObserver.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -15% 0px'
    });

    targets.forEach((target) => {
        observer.observe(target);
    });
});

// タブの見出し（tab-item）を取得
const tabItems = document.querySelectorAll(".tab-item");

tabItems.forEach((tabItem) => {
    tabItem.addEventListener("click", () => {
        // すべてのタブを非アクティブにする
        tabItems.forEach((t) => {
            t.classList.remove("active");
        });
    // すべてのコンテンツを非表示にする
        const tabPanels = document.querySelectorAll(".tab-panel");
        tabPanels.forEach((tabPanel) => {
            tabPanel.classList.remove("active");
        });

        // クリックされたタブをアクティブにする
        tabItem.classList.add("active");

        // 対応するコンテンツを表示
        const tabIndex = Array.from(tabItems).indexOf(tabItem);
        tabPanels[tabIndex].classList.add("active");
    });
});

// Lenisの初期化
const lenis = new Lenis({
  duration: 1.5, // 慣性が効く時間（値を大きくするとスクロールがゆっくり・重たくなる）
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // イージング（滑らかさの計算）
  smoothWheel: true, // ホイールスクロールをスムースにするか
  lerp: 0.08, // 追従の滑らかさ（0.05〜0.1程度に小さくすると「もったり感」が増す）
});

// 描画フレームごとにLenisを更新（必須の処理）
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);