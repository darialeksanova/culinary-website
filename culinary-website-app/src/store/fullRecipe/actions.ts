import { API_URL, API_KEY } from "constants/index";
import { Dispatch } from "redux";
import { RecipeFull } from "types/recipeFull";
import { FullRecipeAction, LoadFullRecipeFailureAction, LoadFullRecipeStartedAction, LoadFullRecipeSuccessAction } from "./types";

const startFullRecipeLoading = (): LoadFullRecipeStartedAction => {
  return {
    type: FullRecipeAction.LOAD_FULL_RECIPE_STARTED,
  };
};

const setFullrecipe = (fullRecipe: RecipeFull): LoadFullRecipeSuccessAction => {
  return {
    type: FullRecipeAction.LOAD_FULL_RECIPE_SUCCESS,
    payload: fullRecipe,
  };
};

const setFullRecipeLoadError = (error: Error): LoadFullRecipeFailureAction => {
  return {
    type: FullRecipeAction.LOAD_FULL_RECIPE_FAILURE,
    payload: error,
  };
};

export const loadFullRecipeById = (recipeId: string) => (dispatch: Dispatch) => {
  dispatch(startFullRecipeLoading());
  fetch(`${API_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}`)
  .then(response => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Error on full recipe fetch!');
  })
  .then((fullRecipeObj: RecipeFull) => {
    dispatch(setFullrecipe(fullRecipeObj));
  })
  .catch((error: Error) => {
    console.log('Sourse is not reachable!');
    dispatch(setFullRecipeLoadError(error));
  });
};
