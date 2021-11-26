import { Action } from "redux";
import { ActionPayload } from "types/actionPayload";
import { RecipeFull } from "types/recipeFull";

export type FullRecipeState = {
  fullRecipe: RecipeFull;
  isLoading: boolean,
  isLoaded: boolean,
  error: null | Error;
};

export enum FullRecipeAction {
  LOAD_FULL_RECIPE_STARTED = 'get-full-recipe-started',
  LOAD_FULL_RECIPE_SUCCESS = 'get-full-recipe-success',
  LOAD_FULL_RECIPE_FAILURE = 'get-full-recipe-failure',
}

export type LoadFullRecipeStartedAction = Action<FullRecipeAction.LOAD_FULL_RECIPE_STARTED>;
export type LoadFullRecipeSuccessAction = ActionPayload<FullRecipeAction.LOAD_FULL_RECIPE_SUCCESS, RecipeFull>;
export type LoadFullRecipeFailureAction = ActionPayload<FullRecipeAction.LOAD_FULL_RECIPE_FAILURE, Error>;

export type FullRecipeReducerAction = 
  | LoadFullRecipeStartedAction
  | LoadFullRecipeSuccessAction
  | LoadFullRecipeFailureAction;