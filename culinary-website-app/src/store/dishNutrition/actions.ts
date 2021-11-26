import { API_URL, API_KEY } from "constants/index";
import { Dispatch } from "redux";
import { DishNutrition } from "types/dishNutrition";
import { DishNutritionAction, LoadDishNutritionFailureAction, LoadDishNutritionStartedAction, LoadDishNutritionSuccessAction } from "./types";

const startDishNutritionLoading = (): LoadDishNutritionStartedAction => {
  return {
    type: DishNutritionAction.LOAD_DISH_NUTRITION_STARTED,
  };
};

const setDishNutrition = (nutrition: DishNutrition): LoadDishNutritionSuccessAction => {
  return {
    type: DishNutritionAction.LOAD_DISH_NUTRITION_SUCCESS,
    payload: nutrition,
  };
};

const setDishNutritionLoadError = (error: Error): LoadDishNutritionFailureAction => {
  return {
    type: DishNutritionAction.LOAD_DISH_NUTRITION_FAILURE,
    payload: error,
  };
};

export const loadDishNutrition = (recipeId: string) => (dispatch: Dispatch) => {
  dispatch(startDishNutritionLoading());
  fetch(`${API_URL}/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`)
  .then(response => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Error on dish nutrients fetch!');
  })
  .then((dishNutrientsObj: DishNutrition) => {
    dispatch(setDishNutrition(dishNutrientsObj));
  })
  .catch((error: Error) => {
    console.log('Sourse is not reachable!');
    dispatch(setDishNutritionLoadError(error));
  });
};