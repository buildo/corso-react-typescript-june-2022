import * as styles from "./Trip.css";

type Props = {
  id: number;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
};

export function Trip(props: Props) {
  return (
    <div className={styles.trip}>
      <span>{`${props.origin} -> ${props.destination}`}</span>
      <span>{`${props.startDate} -> ${props.endDate}`}</span>
    </div>
  );
}
