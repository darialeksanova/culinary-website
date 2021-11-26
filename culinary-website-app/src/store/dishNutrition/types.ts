import { Action } from "redux";
import { DishNutrition } from "types/dishNutrition";
import { ActionPayload } from "types/actionPayload";

export type DishNutritionState = {
  dishNutrition: DishNutrition,
  isLoading: boolean,
  isLoaded: boolean,
  error: null | Error,
};

export enum DishNutritionAction {
  LOAD_DISH_NUTRITION_STARTED = 'get-dish-nutrition-started',
  LOAD_DISH_NUTRITION_SUCCESS = 'get-dish-nutrition-success',
  LOAD_DISH_NUTRITION_FAILURE = 'get-dish-nutrition-failure',
}

export type LoadDishNutritionStartedAction = Action<DishNutritionAction.LOAD_DISH_NUTRITION_STARTED>;
export type LoadDishNutritionSuccessAction = ActionPayload<DishNutritionAction.LOAD_DISH_NUTRITION_SUCCESS, DishNutrition>;
export type LoadDishNutritionFailureAction = ActionPayload<DishNutritionAction.LOAD_DISH_NUTRITION_FAILURE, Error>;

export type DishNutritionReducerAction = 
  | LoadDishNutritionStartedAction
  | LoadDishNutritionSuccessAction
  | LoadDishNutritionFailureAction;