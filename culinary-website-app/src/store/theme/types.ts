import { Action } from "redux";
import { Theme } from "types/theme";

export enum ThemeAction {
  SET_DARK_THEME = 'set-dark-theme',
  SET_LIGHT_THEME = 'set-light-theme',
}

export type ThemeState = {
  theme: Theme;
};

export type setLightThemeAction = Action<ThemeAction.SET_LIGHT_THEME>;
export type setDarkThemeAction = Action<ThemeAction.SET_DARK_THEME>;

export type themeReducerAction = setLightThemeAction | setDarkThemeAction;