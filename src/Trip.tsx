import * as styles from "./Trip.css";
import * as models from "./models";
import { useMutation, useQueryClient } from "react-query";
import { deleteTrip } from "./api";
import { AsyncButton } from "./AsyncButton";
import { useFormatDate, useTranslation } from "./locales/i18n";
import { useNavigate } from "react-router";
import * as routes from "./routes";
import { useState } from "react";

type Props = models.Trip;

type State =
  | {
      state: "ready";
    }
  | {
      state: "confirmDelete";
    };

export function Trip(props: Props) {
  const queryClient = useQueryClient();
  const { status, mutate } = useMutation("deleteTrip", deleteTrip, {
    onSuccess: () => queryClient.invalidateQueries("trips"),
  });
  const [state, updateState] = useState<State>({ state: "ready" });

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

  const navigate = useNavigate();

  const renderDelete = (): React.ReactNode => {
    switch (state.state) {
      case "ready":
        return (
          <button
            className={styles.tripButton}
            onClick={(e) => {
              updateState({ state: "confirmDelete" });
              e.stopPropagation();
            }}
          >
            {t("Trips.deleteButton.idle")}
          </button>
        );
      case "confirmDelete":
        return (
          <>
            <button
              className={styles.tripButton}
              onClick={(e) => {
                updateState({ state: "ready" });
                e.stopPropagation();
              }}
            >
              {t("Trips.deleteCancel")}
            </button>
            <AsyncButton
              className={styles.tripButton}
              onClick={(e) => {
                mutate(props.id);
                e.stopPropagation();
              }}
              status={status}
              labels={{
                loading: t("Trips.deleteButton.loading"),
                error: t("Trips.deleteButton.error"),
                success: t("Trips.deleteButton.success"),
                idle: t("Trips.deleteButton.confirm"),
              }}
            />
          </>
        );
    }
  };

  return (
    <div
      className={`${styles.trip} ${styles.tripStatus[props.status]}`}
      onClick={() => navigate(routes.trip({ tripId: String(props.id) }))}
    >
      <span>{`${props.origin} -> ${props.destination} ${seatNumber} `}</span>
      <div>
        <span>{`${formatDate(props.startDate)} -> ${formatDate(
          props.endDate
        )}`}</span>
        {renderDelete()}
      </div>
    </div>
  );
}
