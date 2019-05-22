import React from "react";

export const colors = {
  primary: "#0066ff",
  primaryTextContrast: "#fff",
  secondary: "#ccc",
  accent: "#00b0a5",
  background: "#fff",
  shadowColor: "#000",

  categoryColors: ["#FFB3BA", "#FFDEB9", "#FFFFB9", "#B9FFC9", "#BAE0FF"]
};

const withColors = Element => props => <Element {...props} colors={colors} />;

export default withColors;
