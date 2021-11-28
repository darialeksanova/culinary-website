import { Dispatch } from "redux";
import { FavouriteRecipesIdsAction, GetFavouriteRecipesIdsAction } from "./types";

const setFavouriteRecipesIds = (favouriteRecipesIds: number[]): GetFavouriteRecipesIdsAction => {
  return {
    type: FavouriteRecipesIdsAction.LOAD_FAVOURITE_RECIPES_IDS,
    payload: favouriteRecipesIds,
  };
};

export const loadFavouriteRecipesIdsFromLocalStorage = () => (dispatch: Dispatch) => {
  const favouriteRecipesIdsAsJSON: string | null = localStorage.getItem('favouriteRecipesIds');

  if (favouriteRecipesIdsAsJSON !== null) {
    const currentFavouriteRecipesIdsParsed: number[] = JSON.parse(favouriteRecipesIdsAsJSON);
    dispatch(setFavouriteRecipesIds(currentFavouriteRecipesIdsParsed));
  } else {
    dispatch(setFavouriteRecipesIds([]));
  };
};

export const addRecipeToFavourites = (recipeId: number) => (dispatch: Dispatch) => {
  const favouriteRecipesIdsAsJSON: string | null = localStorage.getItem('favouriteRecipesIds');

  if (favouriteRecipesIdsAsJSON !== null) {
    const currentFavouriteRecipesIdsParsed: number[] = JSON.parse(favouriteRecipesIdsAsJSON);
    localStorage.setItem('favouriteRecipesIds', JSON.stringify([ ...currentFavouriteRecipesIdsParsed, recipeId ]));
    dispatch(setFavouriteRecipesIds([ ...currentFavouriteRecipesIdsParsed, recipeId ]));
  } else {
    localStorage.setItem('favouriteRecipesIds', JSON.stringify([ recipeId ]));
    dispatch(setFavouriteRecipesIds([ recipeId ]));
  };
};

export const deleteRecipeFromFavourites = (recipeId: number) => (dispatch: Dispatch) => {
  const favouriteRecipesIdsAsJSON: string | null = localStorage.getItem('favouriteRecipesIds');

  if (favouriteRecipesIdsAsJSON !== null) {
    const currentFavouriteRecipesIdsParsed: number[] = JSON.parse(favouriteRecipesIdsAsJSON);
    const newCurrentFavouriteRecipesIdsParsed = currentFavouriteRecipesIdsParsed.filter(favouriteRecipeId => favouriteRecipeId !== recipeId);
    localStorage.setItem('favouriteRecipesIds', JSON.stringify(newCurrentFavouriteRecipesIdsParsed));
    dispatch(setFavouriteRecipesIds(newCurrentFavouriteRecipesIdsParsed));
  } else {
    dispatch(setFavouriteRecipesIds([]));
  };
};
