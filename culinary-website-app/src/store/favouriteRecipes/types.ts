import { RecipePreview } from "types/recipePreview";
import { ActionPayload } from "../../types/actionPayload";

export type FavouriteRecipesState = {
  favouriteRecipes: RecipePreview[];
};

export enum FavouriteRecipesAction {
  LOAD_FAVOURITE_RECIPES = 'load-favourite-recipes',
}

export type GetFavouriteRecipesAction = ActionPayload<FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES, RecipePreview[]>;

export type FavouriteRecipesReducerAction = 
  | GetFavouriteRecipesAction;
