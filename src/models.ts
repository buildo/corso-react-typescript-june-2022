import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/DateFromISOString";

export const TripStatus = t.union([
  t.literal("Requested"),
  t.literal("Booked"),
  t.literal("CheckedIn"),
]);
export type TripStatus = t.TypeOf<typeof TripStatus>;

export const Trip = t.type({
  id: t.string,
  origin: t.string,
  destination: t.string,
  startDate: DateFromISOString,
  endDate: DateFromISOString,
  status: TripStatus,
});
export type Trip = t.TypeOf<typeof Trip>;
