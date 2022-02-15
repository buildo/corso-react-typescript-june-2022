import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/DateFromISOString";

export const TripStatus = t.union([
  t.type({
    status: t.literal("Requested"),
  }),
  t.type({
    status: t.literal("Booked"),
  }),
  t.type({
    status: t.literal("CheckedIn"),
    seatNumber: t.string,
  }),
]);
export type TripStatus = t.TypeOf<typeof TripStatus>;

export const Trip = t.intersection([
  t.type({
    id: t.string,
    origin: t.string,
    destination: t.string,
    startDate: DateFromISOString,
    endDate: DateFromISOString,
  }),
  TripStatus,
]);
export type Trip = t.TypeOf<typeof Trip>;
