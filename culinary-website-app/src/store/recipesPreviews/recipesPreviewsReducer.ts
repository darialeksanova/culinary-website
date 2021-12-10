import { Reducer } from "redux";
import { RecipesPreviewsAction, RecipesPreviewsReducerAction, RecipesPreviewsState } from "./types";

const initialState: RecipesPreviewsState = {
  recipesPreviews: [],
  searchResultsTotalAmount: 0,
  isLoading: false,
  isLoaded: false,
  error: null
};

export const recipesPreviewsReducer: Reducer<RecipesPreviewsState, RecipesPreviewsReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_SUCCESS: {
      return {
        ...state,
        recipesPreviews: action.payload,
        isLoading: false,
        isLoaded: true,
      };
    }

    case RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case RecipesPreviewsAction.SET_RECIPES_PREVIEWS_TOTAL_AMOUNT: {
      return {
        ...state,
        searchResultsTotalAmount: action.payload,
      };
    }

    default: {
      return state;
    }
  };
};
