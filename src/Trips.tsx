import { useEffect, useState } from "react";
import { getTrips } from "./api";

export function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then(setTrips);
  }, []);

  return <pre>{JSON.stringify(trips, null, 2)}</pre>;
}
