// LanguageSwitcher.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n

	.use(Backend)

	.use(LanguageDetector)

	.use(initReactI18next)

	.init({
		fallbackLng: "en",
		whitelist: ["en", "cz"],
		debug: true,
		detection: {
			order: ["localStorage", "cookie"],
			caches: ["localStorage", "cookie"],
		},

		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: `${window.location.origin}/locales/{{lng}}/translation.json`,
		},
	});

export default i18n;
