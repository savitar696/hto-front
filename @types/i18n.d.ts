import { TFunction } from 'i18next';

interface TranslationKeys {
  welcome: string;
  login: string;
  signup: string;
}

declare module 'react-i18next' {
  interface Resources {
    translation: TranslationKeys;
  }
}
