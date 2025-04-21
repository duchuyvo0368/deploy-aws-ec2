import { translations } from './translations';

export const translate = (text) => {
    return translations[text] || text;
};
