import { style } from "@vanilla-extract/css";

export const tripDetails = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const from = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  backgroundColor: "lightgray",
  padding: "8px",
  borderRadius: "4px",
  minWidth: "400px",
});

export const to = style({
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  backgroundColor: "lightgray",
  padding: "8px",
  borderRadius: "4px",
  minWidth: "400px",
});
