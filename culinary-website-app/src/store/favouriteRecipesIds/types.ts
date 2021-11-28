import { ActionPayload } from "../../types/actionPayload";

export type FavouriteRecipesIdsState = {
  favouriteRecipesIds: number[];
};

export enum FavouriteRecipesIdsAction {
  LOAD_FAVOURITE_RECIPES_IDS = 'get-favourite-recipes-ids',
}

export type GetFavouriteRecipesIdsAction = ActionPayload<FavouriteRecipesIdsAction.LOAD_FAVOURITE_RECIPES_IDS, number[]>;

export type FavouriteRecipesIdsReducerAction = 
  | GetFavouriteRecipesIdsAction;
