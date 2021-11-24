import { RecipePreview } from "../../types/recipePreview";
import { Action } from 'redux';
import { ActionPayload } from "../../types/actionPayload";

export type RecipesPreviewState = {
  recipes: RecipePreview[];
  isLoading: boolean;
  isLoaded: boolean;
  error: null | Error;
};

export enum RecipesPreviewAction {
  LOAD_RECIPES_PREVIEW_STARTED = 'get-all-recipes-started',
  LOAD_RECIPES_PREVIEW_SUCCESS = 'get-all-recipes-success',
  LOAD_RECIPES_PREVIEW_FAILURE = 'get-all-recipes-failure',
}

export type LoadRecipesStartedAction = Action<RecipesPreviewAction.LOAD_RECIPES_PREVIEW_STARTED>;
export type LoadRecipesSuccessAction = ActionPayload<RecipesPreviewAction.LOAD_RECIPES_PREVIEW_SUCCESS, RecipePreview[]>;
export type LoadRecipesFailureAction = ActionPayload<RecipesPreviewAction.LOAD_RECIPES_PREVIEW_FAILURE, null | Error>;

export type RecipesPreviewReducerAction = 
    LoadRecipesStartedAction 
  | LoadRecipesSuccessAction
  | LoadRecipesFailureAction;