import { style, styleVariants } from "@vanilla-extract/css";
import { TripStatus } from "./models";

const baseTrip = style({
  display: "flex",
  backgroundColor: "lightgray",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "lightblue",
  },
  selectors: {
    "&:not(:first-child)": {
      marginTop: "8px",
    },
  },
  padding: "0 8px",
  borderRadius: "4px",
});

export const trip: Record<TripStatus, string> = styleVariants({
  Requested: [baseTrip, { background: "lightgrey" }],
  Booked: [baseTrip, { background: "lightgreen" }],
  CheckedIn: [baseTrip, { background: "orange" }],
});
