import i18n, { StringMap, TOptions } from "i18next";
import {
  initReactI18next,
  useTranslation as i18nextUseTranslation,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import it from "./it.json";

export const defaultNS = "translation";

export type TranslatedString = string & { readonly __tag: unique symbol };

type ReactText = TranslatedString | number;
type ReactChild = React.ReactElement<unknown> | ReactText;
interface ChildrenArray extends Array<Children> {}
type ReactFragment = ChildrenArray;
type Children = ReactChild | ReactFragment | boolean | null | undefined;
export type TranslatedChildren = Children;

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

export const useTranslation = () => {
  const { t, i18n } = i18nextUseTranslation();

  type i18nextParameters = Parameters<typeof t>;

  interface TFunction {
    (
      key: i18nextParameters[0],
      options?: TOptions<StringMap> | string
    ): TranslatedString;
    (
      key: i18nextParameters[0],
      defaultValue?: TranslatedString,
      options?: TOptions<StringMap> | string
    ): TranslatedString;
  }

  const translate: TFunction = (...args) => t(...(args as [any]));

  return {
    t: translate,
    i18n,
  };
};

export const isoTranslate = (s: string): TranslatedString =>
  s as TranslatedString;

export function useFormatDate() {
  const { i18n } = useTranslation();

  const formatDate = (d: Date): TranslatedString => {
    return Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d) as TranslatedString;
  };

  return formatDate;
}

export default i18n;
