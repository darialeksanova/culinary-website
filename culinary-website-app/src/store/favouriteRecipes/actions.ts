import { Dispatch } from "redux";
import { RecipePreview } from "types/recipePreview";
import { FavouriteRecipesAction, GetFavouriteRecipesAction, SetFavouriteRecipesTotalAmountAction } from "./types";

const setFavouriteRecipes = ( favouriteRecipes: RecipePreview[] ): GetFavouriteRecipesAction => {
  return {
    type: FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES,
    payload: favouriteRecipes,
  };
};

const setFavouriteRecipesTotalAmount = ( totalAmount: number ): SetFavouriteRecipesTotalAmountAction => {
  return {
    type: FavouriteRecipesAction.SET_FAVOURITE_RECIPES_TOTAL_AMOUNT,
    payload: totalAmount,
  };
};

export const loadFavouriteRecipesFromLocalStorage = () => ( dispatch: Dispatch ) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    dispatch(setFavouriteRecipes(currentFavouriteRecipesParsed));
    dispatch(setFavouriteRecipesTotalAmount(currentFavouriteRecipesParsed.length));
  } else {
    dispatch(setFavouriteRecipes([]));
    dispatch(setFavouriteRecipesTotalAmount(0));
  }
};

export const addRecipeToFavourites = ( recipe: RecipePreview ) => ( dispatch: Dispatch ) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    localStorage.setItem('favouriteRecipes', JSON.stringify([ ...currentFavouriteRecipesParsed, recipe ]));
    dispatch(setFavouriteRecipes([ ...currentFavouriteRecipesParsed, recipe ]));
    dispatch(setFavouriteRecipesTotalAmount(currentFavouriteRecipesParsed.length + 1));
  } else {
    localStorage.setItem('favouriteRecipes', JSON.stringify([ recipe ]));
    dispatch(setFavouriteRecipes([ recipe ]));
    dispatch(setFavouriteRecipesTotalAmount(1));
  }
};

export const deleteRecipeFromFavourites = ( recipe: RecipePreview ) => ( dispatch: Dispatch ) => {
  const favouriteRecipesAsJSON: string | null = localStorage.getItem('favouriteRecipes');

  if (favouriteRecipesAsJSON !== null) {
    const currentFavouriteRecipesParsed: RecipePreview[] = JSON.parse(favouriteRecipesAsJSON);
    const newCurrentFavouriteRecipesParsed = currentFavouriteRecipesParsed
      .filter(favouriteRecipe => favouriteRecipe.id !== recipe.id);
    localStorage.setItem('favouriteRecipes', JSON.stringify(newCurrentFavouriteRecipesParsed));
    dispatch(setFavouriteRecipes(newCurrentFavouriteRecipesParsed));
    dispatch(setFavouriteRecipesTotalAmount(newCurrentFavouriteRecipesParsed.length));
  } else {
    dispatch(setFavouriteRecipes([]));
    dispatch(setFavouriteRecipesTotalAmount(0));
  };
};
