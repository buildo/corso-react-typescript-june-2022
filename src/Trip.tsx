import * as styles from "./Trip.css";
import * as models from "./models";

type Props = models.Trip;

export function Trip(props: Props) {
  return (
    <div className={`${styles.trip} ${styles.tripStatus[props.status]}`}>
      <span>{`${props.origin} -> ${props.destination}`}</span>
      <span>{`${props.startDate.toDateString()} -> ${props.endDate.toDateString()}`}</span>
    </div>
  );
}
