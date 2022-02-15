import * as styles from "./Trip.css";
import * as models from "./models";
import { useMutation, useQueryClient } from "react-query";
import { deleteTrip } from "./api";
import { AsyncButton } from "./AsyncButton";

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

  return (
    <div className={`${styles.trip} ${styles.tripStatus[props.status]}`}>
      <span>{`${props.origin} -> ${props.destination} ${seatNumber} `}</span>
      <div>
        <span>{`${props.startDate.toDateString()} -> ${props.endDate.toDateString()}`}</span>
        <AsyncButton
          className={styles.deleteButton}
          status={status}
          onClick={() => mutate(props.id)}
          labels={{
            loading: "⏳ Deleting trip...",
            error: "💥 Error!",
            success: "✅ Trip deleted!",
            idle: "🗑 Delete trip",
          }}
        />
      </div>
    </div>
  );
}
