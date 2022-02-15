import * as styles from "./Trip.css";
import * as models from "./models";
import { useMutation, useQueryClient } from "react-query";
import { deleteTrip } from "./api";

type Props = models.Trip;

export function Trip(props: Props) {
  const queryClient = useQueryClient();
  const { status, mutate } = useMutation("deleteTrip", deleteTrip, {
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

  const deleteButtonLabel = ((): string => {
    switch (status) {
      case "loading":
        return "⏳ Deleting trip...";
      case "error":
        return "💥 Error!";
      case "idle":
        return "🗑 Delete trip";
      case "success":
        return "✅ Trip deleted!";
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
          {deleteButtonLabel}
        </button>
      </div>
    </div>
  );
}
