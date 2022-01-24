import { path, Params } from "static-path";

export const root = path("/");
export const trips = path("/trips");

export const trip = trips.path(":tripId");
export type TripParams = Params<typeof trip.pattern>;
