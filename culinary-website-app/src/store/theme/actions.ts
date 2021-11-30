export enum ThemeAction {
  SET_DARK_THEME = 'set-dark-theme',
  SET_LIGHT_THEME = 'set-light-theme',
}

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