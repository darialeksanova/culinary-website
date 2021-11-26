import { Reducer } from 'redux';
import { FullRecipeAction, FullRecipeReducerAction, FullRecipeState } from './types';

const initialState: FullRecipeState = {
  fullRecipe: {
    id: 0,
    title: '',
    readyInMinutes: 0,
    servings: 0,
    image: '',
    summary: '',
    analyzedInstructions: [{
      steps: [{
        step: '',
      }],
    }],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
  },
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const fullRecipeReducer: Reducer<FullRecipeState, FullRecipeReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case FullRecipeAction.LOAD_FULL_RECIPE_STARTED: {
      return {
        ...state,
        isRecipeLoading: true,
      };
    }

    case FullRecipeAction.LOAD_FULL_RECIPE_SUCCESS: {
      return {
        ...state,
        fullRecipe: action.payload,
        isRecipeLoading: false,
        isRecipeLoaded: true,
      };
    }

    case FullRecipeAction.LOAD_FULL_RECIPE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  };
};