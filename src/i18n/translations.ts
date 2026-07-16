export const translations = {
  ru: {
    meta: {
      title: 'Магомедов Магомед — IT Project Manager',
      description:
        'IT Project Manager / Technical PM. Управление проектами, Java, Spring Boot, интеграция корпоративных систем.',
    },
    nav: {
      about: 'Обо мне',
      activity: 'Активность',
      projects: 'Проекты',
    },
    hero: {
      greeting: 'Привет, я',
      name: 'Магомедов\nМагомед',
      fullName: 'Магомедов Магомед Расулович',
      title: 'IT Project Manager / Technical PM',
      location: 'Москва',
      age: '18 лет',
      description:
        'Разработку систем знаю изнутри: имею практический опыт с Java, Spring Boot и интеграцией корпоративных систем. Сейчас фокусируюсь на управлении IT-проектами и процессами разработки. Способен оценивать архитектурные решения и эффективно связывать бизнес-требования с технической реализацией.',
    },
    about: {
      title: 'О себе',
      education: {
        label: 'Образование',
        icon: '🎓',
        university: 'Московский Политехнический Университет',
        program:
          'Прикладная информатика: разработка и интеграция бизнес-приложений',
      },
      currentActivity: {
        label: 'Чем занимаюсь сейчас',
        icon: '📚',
        description:
          'Прохожу курс Google Project Management на платформе Coursera',
      },
      competencies: {
        management: {
          label: 'Управление проектами',
          icon: '📊',
          description:
            'Ведение проектов по стандартам PMBOK 7, Agile (Scrum), фасилитация команд, разрешение конфликтов, выстраивание коммуникаций',
        },
        technical: {
          label: 'Технический бэкграунд',
          icon: '⚙️',
          description:
            'Понимание архитектуры, Java, Spring Boot, системы-агрегаторы, интеграция КИС — говорю с разработчиками на одном языке и могу адекватно оценивать эстимейты',
        },
      },
    },
    activity: {
      github: 'Активность GitHub',
      loadingGit: 'Подключение к GitHub API...',
      syncingGit: 'Синхронизация с серверами GitHub...',
      gitError: 'Не удалось загрузить график. Прокси-серверы временно недоступны.',
      openProfile: 'Открыть профиль GitHub →',
      githubStats: 'GitHub Статистика',
      githubGraphTitle: 'Contributions',
      githubGraphDesc: 'График моей активности и коммитов в репозиториях.',
      githubStreakTitle: 'GitHub Streak',
      githubStreakDesc: 'Моя ежедневная активность и максимальный стрик на GitHub.',
      certificates: 'Сертификаты',
      certStepik: 'Курс по mySQL',
      certStepikDesc: 'Посмотреть на Stepik',
      certJira: 'Jira: управление потоком задач',
      certPm: 'PM. От теории к практике',
      certPmbok7: 'Управление проектами: полное погружение в PMBOK-7',
      certOther: 'Прочее',
      certOtherDesc: 'Дополнительные документы',
      certOtherModalTitle: 'Дополнительные документы',
      certOtherCertificate: 'СЕРТИФИКАТ программы «Тренинги предпринимательских компетенций»',
      otherSectionTitle: 'Другое',
      resumeBtn: 'Резюме',
      resumeDesc: 'Посмотреть моё резюме (PDF)',
      stepikStatsTitle: 'STEPIK СТАТИСТИКА',
      stepikGraphTitle: 'Stepik Activity',
      stepikGraphDesc: 'График моей активности на платформе Stepik за последнее время.',
      stepikProfileStatsTitle: 'Stepik Профиль',
      stepikProfileStatsDesc: 'Мои общие знания и репутация на платформе.',
      stepikKnowledge: 'Знания',
      stepikReputation: 'Репутация',
      loadingStepik: 'Загрузка данных Stepik...',
      stepikError: 'Не удалось загрузить данные Stepik.',
      lastUpdated: 'Обновлено',
      radarTitle: 'Активность по дням недели',
      radarDesc: 'Распределение коммитов за последний месяц по дням недели.',
      radarDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      commits: 'коммитов',
    },
    uses: {
      title: 'Инструменты',
      management: {
        label: 'Менеджмент',
        items: [
          { name: 'Notion', detail: 'Выстраивание баз знаний и воркфлоу' },
          { name: 'Jira / Trello', detail: 'Таск-трекеры' },
          { name: 'Git', detail: 'Контроль версий' },
        ],
      },
      software: {
        label: 'ПО',
        items: [
          { name: 'Netlify', detail: 'Хостинг этого сайта' },
          { name: 'Visual Studio Code', detail: 'Редактор кода' },

          { name: 'Obsidian', detail: 'Заметки' },
        ],
      },
      hardware: {
        label: 'Хардвер',
        items: [
          {
            name: 'Xiaomi Book 2022',
            detail: 'AMD Ryzen 5 6600H, 16 ГБ ОЗУ',
          },
          { name: 'Xiaomi G24', detail: 'Монитор' },
          { name: 'Logitech POP Keys', detail: 'Клавиатура' },
          { name: 'Fifine Tank 6', detail: 'Микрофон' },
          { name: 'EMEET C60E 4K', detail: 'Вебкамера' },
          { name: 'Samsung Buds 4 Pro', detail: 'Наушники' },
        ],
      },
    },
    projects: {
      title: 'Проекты',
      mobileAlert: 'Мне было лень адаптировать демо-фото для телефона, поэтому лучше на пк или планшете сайт смотреть, так презентабельнее.',
      proj1: {
        title: 'Street Retail Aggregator',
        stack: ['Java', 'Spring Boot', 'Spring Security (JWT)', 'PostgreSQL', 'Yandex MapKit', 'OpenStreetMap'],
        desc: 'КИС для поиска и аренды коммерческой недвижимости формата «стрит-ритейл». Включает умный алгоритм рекомендаций на основе пространственного анализа (Yandex MapKit), который оценивает инфраструктуру и снижает в выдаче помещения с прямыми конкурентами поблизости.',
        comment: 'Мой комментарий: целью было сделать проект в кратчайшие сроки (1.5 мес), поэтому некоторые адреса захардкожены в код, не соблюдена чистая архитектура, но в целом проект за такие сроки получился оптимизированным и отказоустойчивым.',
      }
    },
    toast: {
      emailCopied: 'Email скопирован в буфер обмена!',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Магомедов Магомед Расулович`,
      builtWith: 'Сделано с помощью',
      hostedBy: 'Отдельная благодарность за хостинг сайту ',
    },
  },

  en: {
    meta: {
      title: 'Magomed Magomedov — IT Project Manager',
      description:
        'IT Project Manager / Technical PM. Project management, Java, Spring Boot, enterprise systems integration.',
    },
    nav: {
      about: 'About',
      activity: 'Activity',
      projects: 'Projects',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Magomed\nMagomedov',
      fullName: 'Magomed Rasulovich Magomedov',
      title: 'IT Project Manager / Technical PM',
      location: 'Moscow',
      age: '18 y.o.',
      description:
        'I know systems development from the inside: hands-on experience with Java, Spring Boot, and enterprise systems integration. Currently focused on IT project management and development processes. Capable of evaluating architectural decisions and effectively bridging business requirements with technical implementation.',
    },
    about: {
      title: 'About Me',
      education: {
        label: 'Education',
        icon: '🎓',
        university: 'Moscow Polytechnic University',
        program:
          'Applied Computer Science: Business Application Development & Integration',
      },
      currentActivity: {
        label: "What I'm doing now",
        icon: '📚',
        description:
          'Taking the Google Project Management course on Coursera',
      },
      competencies: {
        management: {
          label: 'Project Management',
          icon: '📊',
          description:
            'Running projects per PMBOK 7 standards, Agile (Scrum), team facilitation, conflict management, building communications',
        },
        technical: {
          label: 'Technical Background',
          icon: '⚙️',
          description:
            'Understanding of architecture, Java, Spring Boot, aggregation systems, CIS integration — I speak the same language as developers and can adequately evaluate estimates',
        },
      },
    },
    activity: {
      github: 'GitHub Contributions',
      loadingGit: 'Connecting to GitHub API...',
      syncingGit: 'Syncing with GitHub servers...',
      gitError: 'Could not load the graph. Proxy servers are temporarily unavailable.',
      openProfile: 'Open GitHub profile →',
      githubStats: 'GitHub Stats',
      githubGraphTitle: 'Contributions',
      githubGraphDesc: 'My activity and commits graph in repositories.',
      githubStreakTitle: 'GitHub Streak',
      githubStreakDesc: 'My daily activity and longest streak on GitHub.',
      certificates: 'Certificates',
      certStepik: 'Comprehensive mySQL Course',
      certStepikDesc: 'View on Stepik',
      certJira: 'Jira: task flow management',
      certPm: 'PM. From theory to practice',
      certPmbok7: 'Project Management: full immersion in PMBOK-7',
      certOther: 'Other',
      certOtherDesc: 'Additional documents',
      certOtherModalTitle: 'Additional Documents',
      certOtherCertificate: 'CERTIFICATE of the program "Entrepreneurial Competence Trainings"',
      otherSectionTitle: 'Other',
      resumeBtn: 'Resume',
      resumeDesc: 'View my resume (PDF)',
      stepikStatsTitle: 'STEPIK STATS',
      stepikGraphTitle: 'Stepik Activity',
      stepikGraphDesc: 'My activity graph (solved steps) on Stepik over the last year.',
      stepikProfileStatsTitle: 'Stepik Profile',
      stepikProfileStatsDesc: 'My total knowledge and reputation on the platform.',
      stepikKnowledge: 'Knowledge',
      stepikReputation: 'Reputation',
      loadingStepik: 'Loading Stepik data...',
      stepikError: 'Failed to load Stepik data.',
      lastUpdated: 'Updated',
      radarTitle: 'Activity by day of week',
      radarDesc: 'Commit distribution over the last month by day of week.',
      radarDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      commits: 'commits',
    },
    uses: {
      title: 'Uses',
      management: {
        label: 'Management',
        items: [
          {
            name: 'Notion',
            detail: 'Knowledge base & workflow management',
          },
          { name: 'Jira / Trello', detail: 'Task trackers' },
          { name: 'Git', detail: 'Version control' },
        ],
      },
      software: {
        label: 'Software',
        items: [
          { name: 'Netlify', detail: 'Hosting this website' },
          { name: 'Visual Studio Code', detail: 'Code editor' },

          { name: 'Obsidian', detail: 'Notes' },
        ],
      },
      hardware: {
        label: 'Hardware',
        items: [
          {
            name: 'Xiaomi Book 2022',
            detail: 'AMD Ryzen 5 6600H, 16 GB RAM',
          },
          { name: 'Xiaomi G24', detail: 'Monitor' },
          { name: 'Logitech POP Keys', detail: 'Keyboard' },
          { name: 'Fifine Tank 6', detail: 'Microphone' },
          { name: 'EMEET C60E 4K', detail: 'Webcam' },
          { name: 'Samsung Buds 4 Pro', detail: 'Headphones' },
        ],
      },
    },
    projects: {
      title: 'Projects',
      mobileAlert: "I was too lazy to adapt the demo photos for mobile, so it's better to view the site on a PC or tablet, it looks much more presentable.",
      proj1: {
        title: 'Street Retail Aggregator',
        stack: ['Java', 'Spring Boot', 'Spring Security (JWT)', 'PostgreSQL', 'Yandex MapKit', 'OpenStreetMap'],
        desc: 'CIS for searching and renting commercial real estate in the "street retail" format. Includes a smart recommendation algorithm based on spatial analysis (Yandex MapKit), which evaluates infrastructure and lowers the ranking of premises with direct competitors nearby.',
        comment: 'My comment: the goal was to make the project in the shortest possible time (1.5 months), so some addresses are hardcoded, clean architecture is not fully respected, but overall the project turned out to be optimized and fault-tolerant for such a timeframe.',
      }
    },
    toast: {
      emailCopied: 'Email copied to clipboard!',
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Magomed Rasulovich Magomedov`,
      builtWith: 'Built with',
      hostedBy: 'Special thanks for hosting to ',
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type Translations = (typeof translations)[Locale];
