import { createContext, useEffect } from 'react';
import i18n from '../../config/translations/i18n';
import i18next from 'i18next';

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({children, lang}) => {
    const i18nInstance = i18next.createInstance();

    useEffect(() => {
        i18n.changeLanguage(lang);
      }, [lang]);

    return <I18nContext.Provider value={i18nInstance}>{children}</I18nContext.Provider>;
}

export default I18nProvider;

