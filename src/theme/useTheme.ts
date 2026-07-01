import { darkTheme } from "./dark";

export function useTheme() {
  // Later this will switch between dark/light automatically.
  // For now Campfire is dark-only.
  return darkTheme;
}