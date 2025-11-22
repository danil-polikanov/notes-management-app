// src/components/LanguageSwitcher/LanguageSwitcher.tsx

import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const languages = [
        { code: 'en', label: t('language.en') },
        { code: 'uk', label: t('language.uk') },
    ];

    return (
        <div className="language-switcher">
            <label htmlFor="language-select">{t('language.select')}:</label>
            <select
                id="language-select"
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="language-select"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
