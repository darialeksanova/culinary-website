import { Reducer } from "redux";
import { RecipesPreviewAction, RecipesPreviewReducerAction, RecipesPreviewState } from "./types";

const initialState: RecipesPreviewState = {
  recipes: [],
  isLoading: false,
  isLoaded: false,
  error: null
};

export const recipesReducer: Reducer<RecipesPreviewState, RecipesPreviewReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case RecipesPreviewAction.LOAD_RECIPES_PREVIEW_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case RecipesPreviewAction.LOAD_RECIPES_PREVIEW_SUCCESS: {
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
        isLoaded: true,
      };
    }

    case RecipesPreviewAction.LOAD_RECIPES_PREVIEW_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default: {
      return state
    }
  }
};