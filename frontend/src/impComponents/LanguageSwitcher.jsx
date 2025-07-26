import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
            <button
                onClick={() => changeLanguage('en')}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                    i18n.language === 'en' ? 'bg-white text-green-700 shadow' : 'text-slate-600'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('np')}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                    i18n.language === 'np' ? 'bg-white text-green-700 shadow' : 'text-slate-600'
                }`}
            >
                NE
            </button>
        </div>
    );
};

export default LanguageSwitcher;