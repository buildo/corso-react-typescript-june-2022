import * as styles from "./Trip.css";
import * as models from "./models";
import { useMutation, useQueryClient } from "react-query";
import { deleteTrip } from "./api";

type Props = models.Trip;

export function Trip(props: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation("deleteTrip", deleteTrip, {
    onSuccess: () => queryClient.invalidateQueries("trips"),
  });

  const seatNumber = ((): string => {
    switch (props.status) {
      case "Booked":
      case "Requested":
        return "";
      case "CheckedIn":
        return `⋅ 💺 ${props.seatNumber}`;
    }
  })();

  return (
    <div className={`${styles.trip} ${styles.tripStatus[props.status]}`}>
      <span>{`${props.origin} -> ${props.destination} ${seatNumber} `}</span>
      <div>
        <span>{`${props.startDate.toDateString()} -> ${props.endDate.toDateString()}`}</span>
        <button
          className={styles.deleteButton}
          onClick={() => mutate(props.id)}
        >
          🗑 Delete trip
        </button>
      </div>
    </div>
  );
}
