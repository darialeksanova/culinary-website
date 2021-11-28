import { Dispatch } from "redux";
import { RecipePreview } from "types/recipePreview";
import { FavouriteRecipesAction, GetFavouriteRecipesAction } from "./types";

const setFavouriteRecipes = (favouriteRecipes: RecipePreview[]): GetFavouriteRecipesAction => {
  return {
    type: FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES,
    payload: favouriteRecipes,
  };
};

export const loadFavouriteRecipesFromLocalStorage = () => (dispatch: Dispatch) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    dispatch(setFavouriteRecipes(currentFavouriteRecipesParsed));
  } else {
    dispatch(setFavouriteRecipes([]));
  };
};

export const addRecipeToFavourites = (recipe: RecipePreview) => (dispatch: Dispatch) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    localStorage.setItem('favouriteRecipes', JSON.stringify([ ...currentFavouriteRecipesParsed, recipe ]));
    dispatch(setFavouriteRecipes([ ...currentFavouriteRecipesParsed, recipe ]));
  } else {
    localStorage.setItem('favouriteRecipes', JSON.stringify([ recipe ]));
    dispatch(setFavouriteRecipes([ recipe ]));
  };
};

export const deleteRecipeFromFavourites = (recipe: RecipePreview) => (dispatch: Dispatch) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    const newCurrentFavouriteRecipesParsed = currentFavouriteRecipesParsed.filter(favouriteRecipe => favouriteRecipe.id !== recipe.id);
    localStorage.setItem('favouriteRecipes', JSON.stringify(newCurrentFavouriteRecipesParsed));
    dispatch(setFavouriteRecipes(newCurrentFavouriteRecipesParsed));
  } else {
    dispatch(setFavouriteRecipes([]));
  };
};
