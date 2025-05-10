import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import translationEn from './translation/en';
import translationKo from './translation/ko';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    ko: { translation: translationKo },
  },
  lng: 'ko',
  fallbackLng: 'en',
  debug: true,
  interpolation: { escapeValue: false },
});

export default i18n;
