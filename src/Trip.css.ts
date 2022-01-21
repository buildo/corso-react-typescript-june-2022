import { style } from "@vanilla-extract/css";

export const trip = style({
  display: "flex",
  backgroundColor: "lightgray",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  selectors: {
    "&:not(:first-child)": {
      marginTop: "8px",
    },
  },
  padding: "0 8px",
  borderRadius: "4px",
});
