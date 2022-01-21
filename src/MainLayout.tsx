import * as styles from "./MainLayout.css";
import { Trips } from "./Trips";

export function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <header className={styles.header}>Welcome!</header>
      <main className={styles.main}>
        <Trips />
      </main>
    </div>
  );
}
