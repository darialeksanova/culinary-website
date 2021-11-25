import { API_URL, API_KEY } from "constants/index";
import { Dispatch } from "redux";
import { RecipePreview } from "types/recipePreview";
import { LoadRecipesPreviewsFailureAction, LoadRecipesPreviewsStartedAction, LoadRecipesPreviewsSuccessAction, RecipesPreviewsAction } from "./types";

export const startRecipesPreviewLoading = (): LoadRecipesPreviewsStartedAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_STARTED,
  };
};

export const setRecipesPreviews = (recipesPrewiews: RecipePreview[]): LoadRecipesPreviewsSuccessAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_SUCCESS,
    payload: recipesPrewiews,
  };
};

export const setError = (error: Error): LoadRecipesPreviewsFailureAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_FAILURE,
    payload: error,
  };
};

export const loadRecipesPreviews = () => (dispatch: Dispatch) => {
  dispatch(startRecipesPreviewLoading());
  fetch(`${API_URL}/recipes/complexSearch?apiKey=${API_KEY}&number=1`)
  .then(response => {
    if(response.ok) {
      return response.json();
    }

    throw new Error('Error on recipe preview items fetch!');
  })
  .then((recipePreviewItemsObj: {results: RecipePreview[]}) => {
    dispatch(setRecipesPreviews(recipePreviewItemsObj['results']))
  })
  .catch((error: Error) => {
    console.log('Sourse is not reachable!');
    dispatch(setError(error));
  });
};
