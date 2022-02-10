import * as styles from "./TripDetails.css";
import { deleteTrip, getTrip, updateTripStatus } from "./api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router";
import { matchQuery } from "./util/matchQuery";
import { matchMutation } from "./util/matchMutation";
import { useTranslation } from "react-i18next";
import { useFormatDate } from "./locales/i18n";
import * as routes from "./routes";
import { Button } from "./Button";
import { Trip, TripStatus } from "./models";

export function TripDetails() {
  const params = useParams<keyof routes.TripParams>();
  const tripId = params.tripId!;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formatDate = useFormatDate();

  const deleteTripMutation = useMutation(deleteTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries("trips");
      navigate(routes.trips.pattern);
    },
  });

  const updateTripStatusMutation = useMutation(updateTripStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["trip", tripId]);
    },
  });

  const tripQuery = useQuery(["trip", tripId], () => getTrip(tripId));

  const renderStatusSelect = (trip: Trip) => (
    <select
      value={trip.status}
      onChange={(e) =>
        updateTripStatusMutation.mutate({
          id: trip.id,
          newStatus: e.currentTarget.value as TripStatus,
        })
      }
    >
      <option value="Requested">{t("TripStatus.Requested")}</option>
      <option value="Booked">{t("TripStatus.Booked")}</option>
      <option value="CheckedIn">{t("TripStatus.CheckedIn")}</option>
    </select>
  );

  return (
    <div className={styles.tripDetails}>
      {matchQuery(tripQuery, {
        error: () => <div>{t("TripDetails.QueryError", { tripId })}</div>,
        loading: () => <div>{t("TripDetails.QueryLoading")}</div>,
        success: (trip, isFetching) => (
          <>
            <div className={styles.tripBox[trip.status]}>
              <span>{t("TripDetails.From")}</span>
              <span>{trip.origin}</span>
              <span>{formatDate(trip.startDate)}</span>
            </div>
            <div className={styles.tripBox[trip.status]}>
              <span>{t("TripDetails.To")}</span>
              <span>{trip.destination}</span>
              <span>{formatDate(trip.endDate)}</span>
            </div>
            <div className={styles.footer}>
              {matchMutation(updateTripStatusMutation, {
                idle: () => renderStatusSelect(trip),
                success: () =>
                  isFetching
                    ? t("TripDetails.UpdateStatusLoading")
                    : renderStatusSelect(trip),
                error: () => renderStatusSelect(trip),
                loading: () => t("TripDetails.UpdateStatusLoading"),
              })}
              <Button
                onClick={() => {
                  deleteTripMutation.mutate(tripId);
                }}
                status={deleteTripMutation.status}
                content={matchMutation(deleteTripMutation, {
                  idle: () => t("TripDetails.Delete"),
                  success: () => "", // This never happens because of redirect to /trips
                  error: () => t("TripDetails.DeleteError"),
                  loading: () => t("TripDetails.Delete"),
                })}
              />
            </div>
          </>
        ),
      })}
    </div>
  );
}
