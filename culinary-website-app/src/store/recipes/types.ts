import { Recipe } from "../../types/recipe";
import { Action } from 'redux';
import { ActionPayload } from "../../types/actionPayload";

export type RecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
  isLoaded: boolean;
  error: null | Error;
};

export enum RecipesAction {
  LOAD_RECIPES_STARTED = 'get-all-recipes-started',
  LOAD_RECIPES_SUCCESS = 'get-all-recipes-success',
  LOAD_RECIPES_FAILURE = 'get-all-recipes-failure',
}

export type LoadRecipesStartedAction = Action<RecipesAction.LOAD_RECIPES_STARTED>;
export type LoadRecipesSuccessAction = ActionPayload<RecipesAction.LOAD_RECIPES_SUCCESS, Recipe[]>;
export type LoadRecipesFailureAction = ActionPayload<RecipesAction.LOAD_RECIPES_FAILURE, null | Error>;

export type RecipesReducerAction = 
    LoadRecipesStartedAction 
  | LoadRecipesSuccessAction
  | LoadRecipesFailureAction;