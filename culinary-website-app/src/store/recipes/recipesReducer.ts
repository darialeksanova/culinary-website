import { Reducer } from "redux";
import { RecipesAction, RecipesReducerAction, RecipesState } from "./types";

const InitialState: RecipesState = {
  recipes: [],
  isLoading: false,
  isLoaded: false,
  error: null
};

export const recipesReducer: Reducer<RecipesState, RecipesReducerAction> = (state = InitialState, action) => {
  switch (action.type) {
    case RecipesAction.LOAD_RECIPES_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case RecipesAction.LOAD_RECIPES_SUCCESS: {
      return {
        ...state,
        recipes: action.payload,
        isLoading: false,
        isLoaded: true,
      };
    }

    case RecipesAction.LOAD_RECIPES_FAILURE: {
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