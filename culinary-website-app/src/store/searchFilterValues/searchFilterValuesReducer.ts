import { Reducer } from "redux";
import { SearchFilterAction, SearchParamsReducerAction, SearchFilterState } from "./types";

const initialState: SearchFilterState = {
  isDairyFree: false,
  isGlutenFree: false,
  isVegetarian: false,
  isVegan: false,
};

export const searchFilterValuesReducer: Reducer<SearchFilterState, SearchParamsReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case SearchFilterAction.SET_SEARCH_FILTER_VALUES: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SearchFilterAction.CLEAR_SEARCH_FILTER_VALUES: {
      return {
        ...state,
        isDairyFree: false,
        isGlutenFree: false,
        isVegetarian: false,
        isVegan: false,
      };
    }

    default: {
      return state;
    }
  };
};
