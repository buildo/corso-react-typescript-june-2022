import { Trip } from "./models";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { either } from "fp-ts";

const baseUrl = "https://api.airtable.com/v0/appDnoU4THPFBgVIr";
const token = "keyOE5FWfkul67dm0";

const authenticationHeader = {
  Authorization: `Bearer ${token}`,
};

const get = (path: string) =>
  fetch(`${baseUrl}${path}`, { headers: authenticationHeader })
    .then((res) => res.json())
    .then((res) => res.records.map((r: { fields: unknown[] }) => r.fields));

const del = (path: string, id: string) =>
  fetch(`${baseUrl}${path}?records[]=${id}`, {
    method: "DELETE",
    headers: authenticationHeader,
  }).then(() => {});

export const getTrips = async (): Promise<Trip[]> => {
  const response = await get("/Trips");
  await delay(2000);
  return decodeOrThrow(t.array(Trip), response);
};

export const deleteTrip = async (id: Trip["id"]): Promise<void> => {
  await delay(2000);
  return del("/Trips", id);
};

export const getTrip = async (id: Trip["id"]): Promise<Trip> => {
  const trips = await getTrips();
  return (
    trips.find((t) => t.id === id) ||
    Promise.reject(new Error("Trip not found."))
  );
};

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeOrThrow<A, O>(type: t.Type<A, O>, value: unknown): A {
  const decoded = type.decode(value);
  if (either.isLeft(decoded)) {
    throw new Error(PathReporter.report(decoded).join("\n"));
  }
  return decoded.right;
}
