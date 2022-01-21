import { Trip } from "./models";
import * as t from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { either } from "fp-ts";

const baseUrl = process.env.REACT_APP_API_URL;
const token = "keyOE5FWfkul67dm0";

const authenticationHeader = {
  Authorization: `Bearer ${token}`,
};

const get = (path: string) =>
  fetch(`${baseUrl}${path}`, { headers: authenticationHeader })
    .then((res) => res.json())
    .then((res) => res.records.map((r: { fields: unknown[] }) => r.fields));

export const getTrips = async (): Promise<Trip[]> => {
  const response = await get("/Trips");
  await delay(2000);
  return decodeOrThrow(t.array(Trip), response);
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
