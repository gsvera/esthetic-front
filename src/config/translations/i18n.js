import es from './language/es.json';
import en from './language/en.json';
import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

const resources = {
    es: {
        translation: es
    },
    en: {
        translation: en
    }
};


i18next.use(initReactI18next).init({
    lng: 'es',
    resources: resources,
    interpolation: { escapeValue: false },
    fallbackLng: ["es"],
});

export default i18next;