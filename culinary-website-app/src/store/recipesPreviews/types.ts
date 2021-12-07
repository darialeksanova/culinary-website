import { RecipePreview } from "../../types/recipePreview";
import { Action } from 'redux';
import { ActionPayload } from "../../types/actionPayload";

export type RecipesPreviewsState = {
  recipesPreviews: RecipePreview[];
  searchResultsTotalAmount: number;
  isLoading: boolean;
  isLoaded: boolean;
  error: null | Error;
};

export enum RecipesPreviewsAction {
  LOAD_RECIPES_PREVIEWS_STARTED = 'get-all-recipes-previews-started',
  LOAD_RECIPES_PREVIEWS_SUCCESS = 'get-all-recipes-previews-success',
  LOAD_RECIPES_PREVIEWS_FAILURE = 'get-all-recipes-previews-failure',
  SET_RECIPES_PREVIEWS_TOTAL_AMOUNT = 'set-recipes-previews-total-amount',
}

export type LoadRecipesPreviewsStartedAction = Action<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_STARTED>;
export type LoadRecipesPreviewsSuccessAction = ActionPayload<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_SUCCESS, RecipePreview[]>;
export type LoadRecipesPreviewsFailureAction = ActionPayload<RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_FAILURE, null | Error>;
export type SetRecipesPreviewsTotalAmountAction = ActionPayload<RecipesPreviewsAction.SET_RECIPES_PREVIEWS_TOTAL_AMOUNT, number>;

export type RecipesPreviewsReducerAction = 
  |  LoadRecipesPreviewsStartedAction 
  | LoadRecipesPreviewsSuccessAction
  | LoadRecipesPreviewsFailureAction
  | SetRecipesPreviewsTotalAmountAction;
