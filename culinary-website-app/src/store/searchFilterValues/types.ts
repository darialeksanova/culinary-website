import { Action } from "redux";
import { ActionPayload } from "../../types/actionPayload";
import { SearchFilterValue } from "../../types/searchFilterValue";

export type SearchFilterState = SearchFilterValue;

export enum SearchFilterAction {
  SET_SEARCH_FILTER_VALUES = 'set-search-filter-values',
  CLEAR_SEARCH_FILTER_VALUES = 'clear-search-filter-values',
}

export type SetSearchFilterAction = ActionPayload<SearchFilterAction.SET_SEARCH_FILTER_VALUES, Partial<SearchFilterValue>>;
export type ClearSearchFilterAction = Action<SearchFilterAction.CLEAR_SEARCH_FILTER_VALUES>;


export type SearchParamsReducerAction = SetSearchFilterAction | ClearSearchFilterAction;
