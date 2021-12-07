import { RecipePreview } from "types/recipePreview";
import { ActionPayload } from "../../types/actionPayload";

export type FavouriteRecipesState = {
  favouriteRecipes: RecipePreview[];
  favouriteRecipesTotalAmount: number;
};

export enum FavouriteRecipesAction {
  LOAD_FAVOURITE_RECIPES = 'load-favourite-recipes',
  SET_FAVOURITE_RECIPES_TOTAL_AMOUNT = 'set-favourite-recipes-total-amount',
}

export type GetFavouriteRecipesAction = ActionPayload<FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES, RecipePreview[]>;
export type SetFavouriteRecipesTotalAmountAction = ActionPayload<FavouriteRecipesAction.SET_FAVOURITE_RECIPES_TOTAL_AMOUNT, number>;

export type FavouriteRecipesReducerAction = GetFavouriteRecipesAction | SetFavouriteRecipesTotalAmountAction;
