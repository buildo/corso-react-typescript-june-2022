import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/DateFromISOString";

// Using t.keyof instead of t.union
// See https://github.com/gcanti/io-ts/blob/master/index.md#union-of-string-literals
// for an explanation
export const TripStatus = t.keyof({
  Requested: null,
  Booked: null,
  CheckedIn: null,
});
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
