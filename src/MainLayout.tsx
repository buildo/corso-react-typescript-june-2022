import { useTranslation } from "react-i18next";
import * as styles from "./MainLayout.css";
import { Trips } from "./Trips";

export function MainLayout() {
  const { t } = useTranslation();
  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>{t("MainLayout.Trips")}</header>
      <main className={styles.main}>
        <Trips />
      </main>
    </div>
  );
}
