import { Trip, TripStatus } from "./models";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { either } from "fp-ts";

const baseUrl = process.env.REACT_APP_API_URL;
const token = "keyOE5FWfkul67dm0";

const authenticationHeader = {
  Authorization: `Bearer ${token}`,
};

function get(path: string) {
  return fetch(`${baseUrl}${path}`, { headers: authenticationHeader })
    .then((res) => res.json())
    .then((res) => res.records.map((r: { fields: unknown[] }) => r.fields));
}

function del(path: string, id: string) {
  return fetch(`${baseUrl}${path}?records[]=${id}`, {
    method: "DELETE",
    headers: authenticationHeader,
  }).then(() => {});
}

function update<A>(path: string, id: string, newFields: Partial<A>) {
  return fetch(`${baseUrl}${path}`, {
    method: "PATCH",
    headers: {
      ...authenticationHeader,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ records: [{ id, fields: newFields }] }),
  }).then(() => {});
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getTrips = async (): Promise<Trip[]> => {
  const response = await get("/Trips?view=Grid");
  const trips = decodeOrThrow(t.array(Trip), response);
  await delay(2000);
  return trips;
};

export const getTrip = async (id: Trip["id"]): Promise<Trip> => {
  const trips = await getTrips();
  return (
    trips.find((t) => t.id === id) ||
    Promise.reject(new Error("Trip not found"))
  );
};

export const deleteTrip = async (id: Trip["id"]): Promise<void> => {
  await delay(2000);
  return del("/Trips", id);
};

export const updateTripStatus = async (patch: {
  id: Trip["id"];
  newStatus: TripStatus;
}) => {
  return update<Trip>("/Trips", patch.id, { status: patch.newStatus });
};

export function decodeOrThrow<A, O>(type: t.Type<A, O>, value: unknown): A {
  const decoded = type.decode(value);
  if (either.isLeft(decoded)) {
    throw new Error(PathReporter.report(decoded).join("\n"));
  }
  return decoded.right;
}
