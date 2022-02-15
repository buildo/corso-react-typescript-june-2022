import * as styles from "./Trip.css";
import * as models from "./models";

type Props = models.Trip;

export function Trip(props: Props) {
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
      <span>{`${props.startDate.toDateString()} -> ${props.endDate.toDateString()}`}</span>
    </div>
  );
}
