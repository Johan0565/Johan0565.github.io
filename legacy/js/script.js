particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#f97316" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.6, "random": true },
            "size": { "value": 5, "random": true },
            "line_linked": { "enable": true, "distance": 160, "color": "#f97316", "opacity": 0.3, "width": 2 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 160, "line_linked": { "opacity": 0.6, "width": 3 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });
    async function loadGitHubData(year) {
        const container = document.getElementById('gh-target');
        if (!container) return;
        const langWait = currentLang === 'ru' ? 'Синхронизация с серверами GitHub...' : 'Syncing with GitHub servers...';
        container.innerHTML = `<p style="padding-top: 50px; color: #64748b;">${langWait}</p>`;
        document.querySelectorAll('.gh-year-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.gh-year-btn[data-year="${year}"]`).classList.add('active');
        const url = `https://github.com/users/Johan0565/contributions?from=${year}-01-01&to=${year}-12-31`;
        const proxies = [
            `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
            `https://corsproxy.io/?${encodeURIComponent(url)}`,
            `https://corsproxy.org/?url=${encodeURIComponent(url)}`
        ];
        async function fetchGraph(proxyUrl) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 6000);
            try {
                const response = await fetch(proxyUrl, { signal: controller.signal });
                clearTimeout(timeout);
                if (!response.ok) throw new Error('HTTP ' + response.status);
                const html = await response.text(); 
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const calendarGraph = doc.querySelector('.js-calendar-graph');
                if (!calendarGraph) throw new Error('Graph element not found');
                return calendarGraph;
            } catch (e) {
                clearTimeout(timeout);
                throw e;
            }
        }
        try {
            let calendarGraph = null;
            for (let i = 0; i < proxies.length; i++) {
                try {
                    calendarGraph = await fetchGraph(proxies[i]);
                    break;
                } catch (e) {
                    console.log(`Прокси ${i + 1} недоступен: ${e.message}, пробуем следующий...`);
                }
            }
            if (!calendarGraph) throw new Error('All proxies failed');
            container.innerHTML = '';
            container.appendChild(calendarGraph);
            container.querySelectorAll('.ContributionCalendar-day').forEach(day => {
                const hiddenText = day.querySelector('.sr-only');
                if (hiddenText) {
                    day.setAttribute('title', hiddenText.innerText);
                }
            });
        } catch (error) {
            console.error("Ошибка парсинга GitHub: ", error);
            const errMsg = currentLang === 'ru'
                ? 'Не удалось загрузить график. Прокси-серверы временно недоступны. <br><a href="https://github.com/Johan0565" target="_blank" style="color: var(--accent-orange); font-weight: 600;">Открыть профиль GitHub →</a>'
                : 'Could not load the graph. Proxy servers are temporarily unavailable. <br><a href="https://github.com/Johan0565" target="_blank" style="color: var(--accent-orange); font-weight: 600;">Open GitHub profile →</a>';
            container.innerHTML = `<p style="padding-top: 50px; color: #ef4444;">${errMsg}</p>`;
        }
    }
    window.onload = () => loadGitHubData(2026);
    function copyEmail() {
        const email = 'magomed@magomedov.online';
        navigator.clipboard.writeText(email).then(() => {
            showToast(currentLang === 'ru' ? '✉️ Email скопирован: ' + email : '✉️ Email copied: ' + email);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = email; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy');
            document.body.removeChild(ta);
            showToast(currentLang === 'ru' ? '✉️ Email скопирован: ' + email : '✉️ Email copied: ' + email);
        });
    }
    function showToast(msg) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-text').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
    let currentLang = localStorage.getItem('lang') || 'ru';
    const translations = {
        'ru': {
            'nav_about': 'Обо мне', 'nav_portfolio': 'Портфолио',
            'name': 'Магомедов Магомед Расулович', 
            'bio_role': 'Java Backend Developer | Москва, 18 лет',
            'bio_uni': 'ВУЗ: Московский Политехнический Университет',
            'bio_spec': 'Профиль: Прикладная информатика (Разработка и интеграция бизнес-приложений)',
            'bio_focus': 'Стек и фокус: Java, Spring Boot, разработка систем-агрегаторов, интеграция КИС',
            'skills_title': 'Технический стек',
            'portfolio_title': 'Мои проекты',
            'stack': 'Стек:',
            'proj1_title': '🏙️ Street Retail Aggregator',
            'proj1_desc': 'КИС для поиска и аренды коммерческой недвижимости формата «стрит-ритейл». Включает умный алгоритм рекомендаций на основе пространственного анализа (Yandex MapKit), который оценивает инфраструктуру и снижает в выдаче помещения с прямыми конкурентами поблизости.',
            'proj2_title': '🏗️ Aetas: Construction control system',
            'proj2_desc': 'Кроссплатформенная экосистема стройконтроля. Позволяет ставить метки дефектов на 2D-чертежах, прикреплять фото и генерировать PDF-предписания по ГОСТ. Работает оффлайн с последующей умной синхронизацией.',
            'proj2_license': '🚫 Проприетарная лицензия (Закрытый исходный код). Исключительная интеллектуальная собственность автора.',
            'proj3_title': '📂 Учебные CRM и Pet-проекты',
            'proj3_desc': 'Коллекция учебных проектов, включая разработку CRM-систем (EsoftCrm), реализацию паттернов проектирования на Java, верстку маркетплейса и настройку сетей в Cisco Packet Tracer.',
            'github_activity': 'Активность GitHub',
            'loading_git': 'Подключение к GitHub API...',
            'certificates': 'Сертификаты',
            'cert_stepik': 'Подробный курс по mySQL',
            'cert_stepik_desc': 'Посмотреть на Stepik',
            'cert_other': 'Прочее',
            'cert_other_desc': 'Дополнительные документы',
            'modal_title': 'Прочие документы',
            'modal_subtitle': 'Нажмите, чтобы открыть документ',
            'pdf_document': 'PDF документ',
            'pptx_label': 'Презентация проекта'
        },
        'en': {
            'nav_about': 'About Me', 'nav_portfolio': 'Portfolio',
            'name': 'Magomedov Magomed Rasulovich',
            'bio_role': 'Java Backend Developer | Moscow, 18 years old',
            'bio_uni': 'University: Moscow Polytechnic University',
            'bio_spec': 'Profile: Applied Informatics (Business App Development & Integration)',
            'bio_focus': 'Stack & Focus: Java, Spring Boot, aggregator systems development, CIS integration',
            'skills_title': 'Tech Stack',
            'portfolio_title': 'My Projects',
            'stack': 'Stack:',
            'proj1_title': '🏙️ Street Retail Aggregator',
            'proj1_desc': 'Corporate Information System for finding and renting street retail commercial real estate. Features a smart recommendation algorithm based on spatial analysis (Yandex MapKit) that evaluates infrastructure and downranks locations with direct competitors nearby.',
            'proj2_title': '🏗️ Aetas: Construction control system',
            'proj2_desc': 'Cross-platform construction control ecosystem. Allows placing defect markers on 2D blueprints, attaching photos, and generating GOST-compliant PDF reports. Works offline with smart synchronization.',
            'proj2_license': '🚫 Proprietary License (Closed Source). The exclusive intellectual property of the author.',
            'proj3_title': '📂 Educational CRMs & Pet Projects',
            'proj3_desc': 'A collection of educational projects including CRM system development (EsoftCrm), Java design patterns implementation, marketplace frontend, and Cisco Packet Tracer networking.',
            'github_activity': 'GitHub Contributions',
            'loading_git': 'Syncing with GitHub servers...',
            'certificates': 'Certificates',
            'cert_stepik': 'Comprehensive mySQL Course',
            'cert_stepik_desc': 'View on Stepik',
            'cert_other': 'Other',
            'cert_other_desc': 'Additional documents',
            'modal_title': 'Other Documents',
            'modal_subtitle': 'Click to open a document',
            'pdf_document': 'PDF document',
            'pptx_label': 'Project Presentation'
        }
    };
    function toggleLang() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    applyLang();
}
function applyLang() {
    const btnRu = document.getElementById('lang-ru');
    const btnEn = document.getElementById('lang-en');
    if (btnRu) btnRu.classList.toggle('active', currentLang === 'ru');
    if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    const loadingText = document.querySelector('#gh-target p');
    if (loadingText) loadingText.textContent = translations[currentLang]['loading_git'];
    if (typeof renderPdfList === 'function') renderPdfList();
}
document.addEventListener('DOMContentLoaded', () => {
    applyLang();
});
    const allPDFs = [
        { file: 'https___study-techtraining.mipt.ru_api_v1_files_8v5e6gWHZ5bHF7YpE.pdf', nameRu: 'Сертификат МФТИ — Tech Training', nameEn: 'MIPT Tech Training Certificate' },
        { file: '1_nominatsiya_2_mesto_2_komanda.pdf', nameRu: 'ДИПЛОМ ЗА 2 МЕСТО МЕЖДУНАРОДНОМ КЕЙС-ЧЕМПИОНАТЕ «БЕЗОПАСНОСТЬ В ЦИФРОВОМ МИРЕ»', nameEn: 'Diploma for 2nd place in the International Case Championship "Security in the Digital World"' }
    ];
    function renderPdfList() {
        const container = document.getElementById('pdfList');
        if (!container) return;
        container.innerHTML = allPDFs.map((pdf, i) => {
            const displayName = currentLang === 'ru' ? pdf.nameRu : pdf.nameEn;
            const metaLabel = currentLang === 'ru' ? 'PDF документ' : 'PDF document';
            return `
                <a href="../public/allPDFs/${pdf.file}" target="_blank" class="pdf-item" style="animation: fadeIn 0.4s ease ${i * 0.08}s both;">
                    <div class="pdf-item-icon"><i class="fas fa-file-pdf"></i></div>
                    <div class="pdf-item-info">
                        <div class="pdf-item-name">${displayName}</div>
                        <div class="pdf-item-meta">${metaLabel}</div>
                    </div>
                    <i class="fas fa-chevron-right pdf-item-arrow"></i>
                </a>
            `;
        }).join('');
    }
    function openPdfModal() {
        renderPdfList();
        document.getElementById('pdfModalOverlay').classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closePdfModal(e, force) {
        if (force || e.target === document.getElementById('pdfModalOverlay')) {
            document.getElementById('pdfModalOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePdfModal(null, true);
        }
    });
    function toggleProject(card, e) {
        if (e.target.closest('.demo-carousel') || e.target.closest('.pptx-embed-wrapper') || e.target.closest('.gh-link')) return;
        card.classList.toggle('expanded');
    }
    const slideImages = [];
    for (let i = 0; i <= 13; i++) slideImages.push(`../public/demo/${i}.png`);
    const totalSlides = slideImages.length;
    let carouselIndex = 0;
    (function initCoverflow() {
        const viewport = document.getElementById('carouselViewport');
        const dotsContainer = document.getElementById('carouselDots');
        if (!viewport || !dotsContainer) return;
        slideImages.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'demo-carousel-slide';
            slide.dataset.index = i;
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Demo ${i + 1}`;
            img.loading = 'lazy';
            slide.appendChild(img);
            slide.addEventListener('click', (e) => {
                e.stopPropagation();
                if (i !== carouselIndex) goToSlide(i);
            });
            viewport.appendChild(slide);
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(i); });
            dotsContainer.appendChild(dot);
        });
        updateCoverflow();
    })();
    function updateCoverflow() {
        const slides = document.querySelectorAll('.demo-carousel-slide');
        slides.forEach((slide, i) => {
            slide.className = 'demo-carousel-slide';
            const diff = i - carouselIndex;
            if (diff === 0) slide.classList.add('active');
            else if (diff === -1 || (carouselIndex === 0 && i === totalSlides - 1)) slide.classList.add(diff === -1 ? 'pos-left' : 'pos-left');
            else if (diff === 1 || (carouselIndex === totalSlides - 1 && i === 0)) slide.classList.add(diff === 1 ? 'pos-right' : 'pos-right');
            else if (diff === -2 || (carouselIndex <= 1 && i === totalSlides - 2 + carouselIndex)) slide.classList.add('pos-far-left');
            else if (diff === 2 || (carouselIndex >= totalSlides - 2 && i === carouselIndex - totalSlides + 2)) slide.classList.add('pos-far-right');
        });
        slides.forEach((slide) => {
            const i = parseInt(slide.dataset.index);
            const diff = i - carouselIndex;
            slide.className = 'demo-carousel-slide';
            if (diff === 0) slide.classList.add('active');
            else if (diff === -1) slide.classList.add('pos-left');
            else if (diff === 1) slide.classList.add('pos-right');
            else if (diff === -2) slide.classList.add('pos-far-left');
            else if (diff === 2) slide.classList.add('pos-far-right');
        });
        document.getElementById('carouselCurrent').textContent = carouselIndex + 1;
        document.querySelectorAll('#carouselDots span').forEach((dot, i) => {
            dot.classList.toggle('active', i === carouselIndex);
        });
    }
    function goToSlide(index) {
        carouselIndex = Math.max(0, Math.min(totalSlides - 1, index));
        updateCoverflow();
    }
    function moveCarousel(dir) {
        let next = carouselIndex + dir;
        if (next < 0) next = totalSlides - 1;
        if (next >= totalSlides) next = 0;
        goToSlide(next);
    }
    document.addEventListener('keydown', (e) => {
        const carousel = document.getElementById('demoCarousel');
        if (!carousel || !carousel.closest('.expanded')) return;
        if (e.key === 'ArrowLeft') { moveCarousel(-1); e.preventDefault(); }
        if (e.key === 'ArrowRight') { moveCarousel(1); e.preventDefault(); }
    });
    (function initSwipe() {
        const carousel = document.getElementById('demoCarousel');
        if (!carousel) return;
        let startX = 0, diffX = 0;
        carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchmove', (e) => { diffX = e.touches[0].clientX - startX; }, { passive: true });
        carousel.addEventListener('touchend', () => {
            if (Math.abs(diffX) > 50) {
                moveCarousel(diffX > 0 ? -1 : 1);
            }
            diffX = 0;
        });
    })();