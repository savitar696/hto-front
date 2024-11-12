import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import us from '@shared/lib/locales/us/translation.json';
import ru from '@shared/lib/locales/ru/translation.json';
import ua from '@shared/lib/locales/ua/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      us: { translation: us },
      ru: { translation: ru },
      ua: { translation: ua },
    },
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: 'en',
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
