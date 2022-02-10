import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { TripStatus } from "./models";

export const tripDetails = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const baseBox = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  backgroundColor: "lightgray",
  padding: "8px",
  borderRadius: "4px",
  minWidth: "400px",
});

export const tripBox: Record<TripStatus, string> = styleVariants({
  Requested: [baseBox, { background: "lightgrey" }],
  Booked: [baseBox, { background: "lightgreen" }],
  CheckedIn: [baseBox, { background: "orange" }],
});

export const footer = style({
  display: "flex",
  flexDirection: "row",
  marginTop: "8px",
  paddingTop: "8px",
  minWidth: "400px",
  justifyContent: "flex-end",
  borderTop: "1px solid lightgray",
});

globalStyle(`${footer} > button`, {
  cursor: "pointer",
});

globalStyle(`${footer} > *`, {
  marginLeft: "16px",
});
