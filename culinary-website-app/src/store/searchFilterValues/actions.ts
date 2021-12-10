import { SearchFilterValue } from "../../types/searchFilterValue";
import { SearchFilterAction } from "./types";

export const setSearchFilterValues = ( filterValues: Partial<SearchFilterValue> ) => {
  return {
    type: SearchFilterAction.SET_SEARCH_FILTER_VALUES,
    payload: filterValues,
  };
};

export const clearSearchFilterValues = () => {
  return {
    type: SearchFilterAction.CLEAR_SEARCH_FILTER_VALUES,
  };
};