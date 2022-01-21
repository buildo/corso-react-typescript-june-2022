import * as t from "io-ts";
import { DateFromISOString } from "io-ts-types/DateFromISOString";

export const Trip = t.type({
  id: t.string,
  origin: t.string,
  destination: t.string,
  startDate: DateFromISOString,
  endDate: DateFromISOString,
});
export type Trip = t.TypeOf<typeof Trip>;
