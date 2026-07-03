export const colors = {
  // Backgrounds
  background: "#0B0F14",
  surface: "#151A23",
  surfaceElevated: "#1E2530",

  // Brand
  primary: "#F97316",
  primarySoft: "#FDBA74",
  secondary: "#EAB308",

  // Text
  text: "#F8FAFC",
   textSecondary: "#94A3B8",
  textMuted: "#94A3B8",
  placeholder: "#64748B",

  // Borders
  border: "#2C3440",

  // States
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Misc
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export type Colors = typeof colors;