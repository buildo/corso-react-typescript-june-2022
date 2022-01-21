import * as styles from "./Trip.css";
import * as models from "./models";

type Props = models.Trip;

export function Trip(props: Props) {
  return (
    <div className={styles.trip}>
      <span>{`${props.origin} -> ${props.destination}`}</span>
      <span>{`${props.startDate} -> ${props.endDate}`}</span>
    </div>
  );
}
