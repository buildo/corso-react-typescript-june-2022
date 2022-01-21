import { getTrips } from "./api";
import { Trip } from "./Trip";
import * as styles from "./Trips.css";
import { useQuery } from "react-query";

export function Trips() {
  const { data: trips } = useQuery("trips", getTrips);

  return (
    <div className={styles.trips}>
      {trips?.map((trip) => (
        <Trip key={trip.id} {...trip} />
      ))}
    </div>
  );
}
