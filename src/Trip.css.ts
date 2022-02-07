import { style, styleVariants } from "@vanilla-extract/css";

export const trip = style({
  display: "flex",
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

export const tripStatus = {
  Requested: style({ background: "lightgray" }),
  Booked: style({ background: "lightgreen" }),
  CheckedIn: style({ background: "orange" }),
};

export const deleteButton = style({
  marginLeft: 16,
});

const baseDialogOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  backgroundColor: "rgba(0, 0, 0, .4)",
  alignItems: "center",
  justifyContent: "center",
});

export const dialog = style({
  padding: 24,
  backgroundColor: "white",
});

export const dialogActions = style({
  display: "flex",
  marginTop: 24,
  justifyContent: "flex-end",
});

export const dialogOverlay: Record<"open" | "closed", string> = styleVariants({
  open: [baseDialogOverlay],
  closed: [baseDialogOverlay, { display: "none" }],
});
