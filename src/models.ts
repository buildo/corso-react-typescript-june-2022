import * as t from "io-ts";

export const Trip = t.type({
  id: t.string,
  origin: t.string,
  destination: t.string,
  startDate: t.string,
  endDate: t.string,
});
export type Trip = t.TypeOf<typeof Trip>;
