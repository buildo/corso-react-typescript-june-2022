import * as styles from "./TripDetails.css";
import { getTrip } from "./api";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { matchQuery } from "./util/matchQuery";
import { useTranslation } from "react-i18next";
import { useFormatDate } from "./locales/i18n";

export function TripDetails() {
  const params = useParams<"tripId">();
  const tripId = params.tripId!;
  const { t } = useTranslation();
  const formatDate = useFormatDate();

  const tripQuery = useQuery(["trip", tripId], () => getTrip(tripId));

  return (
    <div className={styles.tripDetails}>
      {matchQuery(tripQuery, {
        error: () => <div>{t("TripDetails.error")}</div>,
        loading: () => <div>{t("TripDetails.loading")}</div>,
        success: (trip) => (
          <>
            <div className={styles.from}>
              <span>{t("TripDetails.from")}</span>
              <span>{trip.origin}</span>
              <span>{formatDate(trip.startDate)}</span>
            </div>
            <div className={styles.to}>
              <span>{t("TripDetails.to")}</span>
              <span>{trip.destination}</span>
              <span>{formatDate(trip.endDate)}</span>
            </div>
          </>
        ),
      })}
    </div>
  );
}
