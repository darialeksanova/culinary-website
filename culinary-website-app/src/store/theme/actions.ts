import { ThemeAction } from "./types";

export const setLightTheme = () => {
  return {
    type: ThemeAction.SET_LIGHT_THEME,
  };
};

export const setDarkTheme = () => {
  return {
    type: ThemeAction.SET_DARK_THEME,
  };
};