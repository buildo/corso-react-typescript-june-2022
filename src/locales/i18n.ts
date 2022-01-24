import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import it from "./it.json";

export const defaultNS = "translation";

type Locale = "en" | "it";
type Resources = {
  [key in Locale]: {
    translation: typeof en & typeof it;
  };
};

export const resources: Resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    defaultNS,
    resources,
  });

export function useFormatDate() {
  const { i18n } = useTranslation();

  const formatDate = (d: Date): string => {
    return Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  };

  return formatDate;
}

export default i18n;
