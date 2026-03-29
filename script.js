// Настройка частиц (светлые, аккуратные)
particlesJS("particles-js", {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#0056b3" }, // Синие частицы
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#0056b3",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
        "push": { "particles_nb": 3 }
      }
    },
    "retina_detect": true
});

// Логика переключения языков
const translations = {
    ru: {
        name: "Магомед Расулович Магомедов",
        bio: `
            <p>🎓 Студент 2 курса <b>Московского Политеха</b></p>
            <p>(Прикладная информатика • Разработка и интеграция бизнес-приложений)</p>
            <p>💡 Увлекаюсь программированием с 13 лет</p>
            <p>🌍 Живу в Москве | 18 лет</p>
        `,
        btnTg: "Telegram",
        btnMail: "Email",
        skillsTitle: "Мой стек технологий",
        extraTitle: "Также есть опыт работы с:"
    },
    en: {
        name: "Magomed Rasulovich Magomedov",
        bio: `
            <p>🎓 2nd-year student at <b>Moscow Polytechnic University</b></p>
            <p>(Applied Informatics • Business App Development & Integration)</p>
            <p>💡 I’ve been into programming since I was 13</p>
            <p>🌍 Based in Moscow | 18 years old</p>
        `,
        btnTg: "Telegram",
        btnMail: "Email",
        skillsTitle: "My Tech Stack",
        extraTitle: "Also experienced with:"
    }
};

let currentLang = 'ru';
const langToggleBtn = document.getElementById('lang-toggle');

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    langToggleBtn.innerText = currentLang === 'ru' ? 'EN' : 'RU';
    
    document.getElementById('name').innerText = translations[currentLang].name;
    document.getElementById('bio-text').innerHTML = translations[currentLang].bio;
    document.getElementById('btn-tg').innerText = translations[currentLang].btnTg;
    document.getElementById('btn-mail').innerText = translations[currentLang].btnMail;
    document.getElementById('skills-title').innerText = translations[currentLang].skillsTitle;
    document.getElementById('extra-title').innerText = translations[currentLang].extraTitle;
});