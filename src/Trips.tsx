import { useEffect, useState } from "react";
import { getTrips } from "./api";
import { Trip } from "./Trip";
import * as styles from "./Trips.css";
import * as models from "./models";

export function Trips() {
  const [trips, setTrips] = useState<models.Trip[]>([]);

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  return (
    <div className={styles.trips}>
      {trips.map((trip) => (
        <Trip key={trip.id} {...trip} />
      ))}
    </div>
  );
}
