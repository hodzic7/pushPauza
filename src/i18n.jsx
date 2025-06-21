import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translation/en.json';
import translationBS from './translation/bs.json';
const resources = {
  en: { translation: translationEN },
  bs: { translation: translationBS }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
