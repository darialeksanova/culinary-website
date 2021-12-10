import { Reducer } from 'redux';
import { Theme } from 'types/theme';
import { ThemeAction } from './types';
import { themeReducerAction, ThemeState } from './types';

const InitialState: ThemeState = {
  theme: Theme.light,
};

export const themeReducer: Reducer<ThemeState, themeReducerAction> = (state: ThemeState = InitialState, action: themeReducerAction) => {
  switch (action.type) {
    case ThemeAction.SET_LIGHT_THEME: {
      return {
        ...state,
        theme: Theme.light,
      };
    }

    case ThemeAction.SET_DARK_THEME: {
      return {
        ...state,
        theme: Theme.dark,
      };
    }

    default: {
      return state;
    }
  }
};