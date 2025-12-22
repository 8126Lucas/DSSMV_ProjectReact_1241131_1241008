import dict_en from './translations/en.json';
import dict_pt from './translations/pt.json';
import dict_es from './translations/es.json';
import i18n from "i18next";
import {store} from "@/src/flux/store/store";
import {initReactI18next} from "react-i18next";

const dictionaries = {
    'en': {translation: dict_en},
    'pt': {translation: dict_pt},
    'es': {translation: dict_es},
};

const initI18n = async () => {
    const user = store.getState().user;
    const language: string = user.language || 'en';
    await i18n.use(initReactI18next).init({
        resources: dictionaries,
        lng: language,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });
};

initI18n();

export default i18n;