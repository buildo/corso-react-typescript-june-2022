import * as styles from "./Trip.css";
import * as models from "./models";
import { useNavigate } from "react-router";
import * as routes from "./routes";
import { useFormatDate } from "./locales/i18n";

type Props = models.Trip;

export function Trip(props: Props) {
  const navigate = useNavigate();
  const formatDate = useFormatDate();

  return (
    <div
      className={styles.trip[props.status]}
      onClick={() => navigate(routes.trip({ tripId: String(props.id) }))}
    >
      <span>{`${props.origin} -> ${props.destination}`}</span>
      <span>{`${formatDate(props.startDate)} -> ${formatDate(
        props.endDate
      )}`}</span>
    </div>
  );
}
