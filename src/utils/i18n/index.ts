import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "@/utils/i18n/locales/en/translation.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    en: {
      translation: translationEn,
    },
  },
  ns: ["translation"],
  defaultNS: "translation",
});

i18n.languages = ["en"];

export default i18n;
