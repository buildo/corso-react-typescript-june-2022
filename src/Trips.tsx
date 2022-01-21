import { getTrips } from "./api";
import { Trip } from "./Trip";
import * as styles from "./Trips.css";
import { useQuery } from "react-query";
import { ReactNode } from "react";

export function Trips() {
  const query = useQuery("trips", getTrips);

  const content = ((): Exclude<ReactNode, undefined> => {
    switch (query.status) {
      case "success":
        return query.data.map((trip) => <Trip key={trip.id} {...trip} />);
      case "error":
        return "Error while fetching trips!!";
      case "loading":
        return "Loading...";
      case "idle":
        return null;
    }
  })();

  return <div className={styles.trips}>{content}</div>;
}
