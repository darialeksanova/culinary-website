import { RecipePreview } from "../../types/recipePreview";
import { Action } from 'redux';
import { ActionPayload } from "../../types/actionPayload";

export type RecipesPreviewsState = {
  recipesPreviews: RecipePreview[];
  isLoading: boolean;
  isLoaded: boolean;
  error: null | Error;
};

export enum RecipesPreviewsAction {
  LOAD_RECIPES_PREVIEWS_STARTED = 'get-all-recipes-previews-started',
  LOAD_RECIPES_PREVIEWS_SUCCESS = 'get-all-recipes-previews-success',
  LOAD_RECIPES_PREVIEWS_FAILURE = 'get-all-recipes-previews-failure',
}

export type LoadRecipesPreviewsStartedAction = Action<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_STARTED>;
export type LoadRecipesPreviewsSuccessAction = ActionPayload<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_SUCCESS, RecipePreview[]>;
export type LoadRecipesPreviewsFailureAction = ActionPayload<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_FAILURE, null | Error>;

export type RecipesPreviewsReducerAction = 
  |  LoadRecipesPreviewsStartedAction 
  | LoadRecipesPreviewsSuccessAction
  | LoadRecipesPreviewsFailureAction;
