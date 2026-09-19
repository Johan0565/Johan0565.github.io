import { translations, type Locale } from '../i18n/translations';

export const pageKeys = ['home', 'projects', 'activity'] as const;
export type PageKey = (typeof pageKeys)[number];

export function pagePath(page: PageKey, locale: Locale) {
  return `${locale === 'ru' ? '/ru' : ''}/${page === 'home' ? '' : `${page}/`}`;
}

export const biography = {
  ru: translations.ru.hero.description,
  en: translations.en.hero.description,
} satisfies Record<Locale, string>;

export const pageMeta = {
  ru: {
    home: { title: 'Магомедов Магомед — IT Project Manager в Москве', description: 'Магомедов Магомед Расулович — IT Project Manager / Technical PM из Москвы. Java, Spring Boot, управление IT-проектами, портфолио и сертификаты.' },
    projects: { title: 'Проекты — Магомедов Магомед | Java и JavaScript', description: 'Проекты Магомедова Магомеда: Street Retail Aggregator на Java и Spring Boot, расширение Coursera Subtitles Extension. Описание, демо и исходный код.' },
    activity: { title: 'Сертификаты и активность — Магомедов Магомед', description: 'Обучение и активность Магомедова Магомеда: прогресс Google Project Management, сертификаты Stepik, проекты GitHub и резюме IT Project Manager.' },
  },
  en: {
    home: { title: 'Magomed Magomedov — IT Project Manager in Moscow', description: 'Magomed Rasulovich Magomedov — IT Project Manager / Technical PM in Moscow. Java, Spring Boot, enterprise integration, projects and certificates.' },
    projects: { title: 'Projects — Magomed Magomedov | Java & JavaScript', description: 'Explore projects by Magomed Magomedov: Street Retail Aggregator with Java and Spring Boot, and Coursera Subtitles Extension. Demos and source code.' },
    activity: { title: 'Certificates & Activity — Magomed Magomedov', description: 'Magomed Magomedov’s learning and activity: Google Project Management progress, Stepik certificates, GitHub contributions and IT Project Manager resume.' },
  },
} satisfies Record<Locale, Record<PageKey, { title: string; description: string }>>;

export function structuredData(site: URL, locale: Locale, page: PageKey) {
  const tr = translations[locale];
  const absolute = (path: string) => new URL(path, site).href;
  const url = absolute(pagePath(page, locale));
  const personId = absolute('/#person');
  const websiteId = absolute('/#website');
  const person = {
    '@type': 'Person', '@id': personId,
    name: tr.hero.fullName,
    alternateName: ['Магомедов Магомед Расулович', 'Magomed Rasulovich Magomedov', 'Magomed Magomedov', 'Johan0565'],
    url: absolute(pagePath('home', locale)),
    image: absolute('/images/avatar.jpg'),
    description: biography[locale],
    jobTitle: tr.hero.title,
    homeLocation: { '@type': 'City', name: tr.hero.location },
    knowsAbout: ['IT project management', 'PMBOK 7', 'Agile', 'Scrum', 'Java', 'Spring Boot', 'Enterprise systems integration'],
    sameAs: ['https://github.com/Johan0565', 'https://t.me/Magomedov765', 'https://x.com/MMagomedovR'],
  };
  const projects = [
    { ...tr.projects.proj1, id: 'street-retail-aggregator', repository: 'https://github.com/Johan0565/street-retail-aggregator', language: 'Java' },
    { ...tr.projects.proj2, id: 'coursera-subtitles', repository: 'https://github.com/Johan0565/Subtitles-For-Coursera', language: 'JavaScript' },
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      { '@type': 'WebSite', '@id': websiteId, url: absolute('/'), name: 'Magomed Magomedov / Магомедов Магомед', inLanguage: ['en', 'ru'], publisher: { '@id': personId } },
      {
        '@type': page === 'home' ? 'ProfilePage' : 'CollectionPage', '@id': `${url}#webpage`, url,
        name: pageMeta[locale][page].title, description: pageMeta[locale][page].description,
        inLanguage: locale, isPartOf: { '@id': websiteId }, about: { '@id': personId },
        ...(page === 'home' ? { mainEntity: { '@id': personId } } : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
        ...(page === 'projects' ? { mainEntity: { '@type': 'ItemList', itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem', position: index + 1, item: {
            '@type': 'SoftwareSourceCode', '@id': `${url}#${project.id}`, name: project.title,
            description: project.desc, codeRepository: project.repository, programmingLanguage: project.language,
            author: { '@id': personId }, url: `${url}#${project.id}`,
          },
        })) } } : {}),
      },
      ...(page === 'home' ? [] : [{
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: tr.nav.about, item: absolute(pagePath('home', locale)) },
          { '@type': 'ListItem', position: 2, name: tr.nav[page], item: url },
        ],
      }]),
    ],
  };
}
