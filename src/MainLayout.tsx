import { useTranslation } from "./locales/i18n";
import * as styles from "./MainLayout.css";
import { Outlet } from "react-router-dom";
import { useMatch } from "react-router";

export function MainLayout() {
  const { t, i18n } = useTranslation();
  const isTripView = useMatch("/trips/:tripId");

  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>
        {isTripView ? t("MainLayout.TripDetails") : t("MainLayout.Trips")}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.currentTarget.value)}
        >
          <option value="en">{t("LanguageSelector.English")}</option>
          <option value="it">{t("LanguageSelector.Italian")}</option>
        </select>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
