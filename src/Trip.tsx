import * as styles from "./Trip.css";
import * as models from "./models";
import { useMutation, useQueryClient } from "react-query";
import { deleteTrip } from "./api";
import { AsyncButton } from "./AsyncButton";
import { useFormatDate, useTranslation } from "./locales/i18n";

type Props = models.Trip;

export function Trip(props: Props) {
  const queryClient = useQueryClient();
  const { status, mutate } = useMutation("deleteTrip", deleteTrip, {
    onSuccess: () => queryClient.invalidateQueries("trips"),
  });

  const { t } = useTranslation();

  const seatNumber = ((): string => {
    switch (props.status) {
      case "Booked":
      case "Requested":
        return "";
      case "CheckedIn":
        return `⋅ 💺 ${props.seatNumber}`;
    }
  })();

  const formatDate = useFormatDate();

  return (
    <div className={`${styles.trip} ${styles.tripStatus[props.status]}`}>
      <span>{`${props.origin} -> ${props.destination} ${seatNumber} `}</span>
      <div>
        <span>{`${formatDate(props.startDate)} -> ${formatDate(
          props.endDate
        )}`}</span>
        <AsyncButton
          className={styles.deleteButton}
          status={status}
          onClick={() => mutate(props.id)}
          labels={{
            loading: t("Trips.deleteButton.loading"),
            error: t("Trips.deleteButton.error"),
            success: t("Trips.deleteButton.success"),
            idle: t("Trips.deleteButton.idle"),
          }}
        />
      </div>
    </div>
  );
}
