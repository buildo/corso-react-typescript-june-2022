import { useTranslation } from "react-i18next";
import * as styles from "./MainLayout.css";
import { Trips } from "./Trips";

export function MainLayout() {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        {t("MainLayout.Trips")}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.currentTarget.value)}
        >
          <option value="en">{t("LanguageSelector.English")}</option>
          <option value="it">{t("LanguageSelector.Italian")}</option>
        </select>
      </header>
      <main className={styles.main}>
        <Trips />
      </main>
    </div>
  );
}
