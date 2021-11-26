import { Reducer } from 'redux';
import { DishNutritionAction, DishNutritionReducerAction, DishNutritionState } from './types';

const initialState: DishNutritionState = {
  dishNutrition: {
    calories: '',
    carbs: '',
    fat: '',
    protein: '',
  },
  isLoading: false,
  isLoaded: false,
  error: null,
};

export const dishNutritionReducer: Reducer<DishNutritionState, DishNutritionReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case DishNutritionAction.LOAD_DISH_NUTRITION_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case DishNutritionAction.LOAD_DISH_NUTRITION_SUCCESS: {
      return {
        ...state,
        dishNutrition: action.payload,
        isLoading: false,
        isLoaded: true,
      };
    }

    case DishNutritionAction.LOAD_DISH_NUTRITION_FAILURE: {
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