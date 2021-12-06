import { API_URL, API_KEY } from "constants/index";
import { Dispatch } from "redux";
import { PaginatedSearchResults } from "types/paginatedSearchResults";
import { RecipePreview } from "types/recipePreview";
import { SearchFilterValue } from "types/searchFilterValue";
import { SearchParams } from "types/searchParams";
import { LoadRecipesPreviewsFailureAction, LoadRecipesPreviewsStartedAction, LoadRecipesPreviewsSuccessAction, RecipesPreviewsAction } from "./types";

const startRecipesPreviewLoading = (): LoadRecipesPreviewsStartedAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_STARTED,
  };
};

const setRecipesPreviews = ( recipesPrewiews: RecipePreview[] ): LoadRecipesPreviewsSuccessAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_SUCCESS,
    payload: recipesPrewiews,
  };
};

const setError = ( error: Error ): LoadRecipesPreviewsFailureAction => {
  return {
    type: RecipesPreviewsAction.LOAD_RECIPES_PREVIEWS_FAILURE,
    payload: error,
  };
};

const getDietFilterValues = ( searchFilterValues: SearchFilterValue ): string[] => {
  const dietFilterValues = [];

  if (searchFilterValues.isVegetarian) {
    dietFilterValues.push('Vegetarian');
  }

  if (searchFilterValues.isVegan) {
    dietFilterValues.push('Vegan');
  }

  if (searchFilterValues.isGlutenFree) {
    dietFilterValues.push('Gluten Free');
  }

  return dietFilterValues;
};

const composeURLSearchParams = ( searchParams: SearchParams ): string => {
  const dietFilterValues = getDietFilterValues(searchParams.filters);
  const complexSearchURLParams: { [key: string]: string } = {
    apiKey: API_KEY,
  };

  if (dietFilterValues.length !== 0) {
    complexSearchURLParams.diet = dietFilterValues.join(',');
  }

  if (searchParams.filters.isDairyFree) {
    complexSearchURLParams.intolerances = 'Dairy';
  }

  if (searchParams.searchInput !== '') {
    complexSearchURLParams.titleMatch = searchParams.searchInput.toLowerCase();
  }

  return Object.entries(complexSearchURLParams).map(([ paramKey, paramValue ]) => `${paramKey}=${paramValue}`).join('&');
};

export const loadRecipesPreviews = ( searchParams: SearchParams ) => ( dispatch: Dispatch ) => {
  dispatch(startRecipesPreviewLoading());
  Promise.all([
    fetch(`${API_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchParams.searchInput}&number=100`)
      .then(response => {
        if(response.ok) {
          return response.json() as Promise<RecipePreview[]>;
        }

        throw new Error('Error on dish ingredients fetch!');
      }),
    fetch(`${API_URL}/recipes/complexSearch?${composeURLSearchParams(searchParams)}&number=100`)
      .then(response => {
        if(response.ok) {
          return response.json() as Promise<PaginatedSearchResults<RecipePreview>>;
        }

        throw new Error('Error on recipe preview items fetch!');
      }),
  ])
  .then(([ foundByIngredients, foundByOtherConditions ]) => {
    let searchResult = [ ...foundByOtherConditions.results ];

    if (searchParams.searchInput !== '') {
      searchResult
        .filter(recipeByOtherConditions => foundByIngredients
          .find(recipeByIngredients => recipeByIngredients.id === recipeByOtherConditions.id)
        );
    }

    dispatch(setRecipesPreviews(searchResult.slice(0, searchParams.totalRecipes)));
  })
  .catch(( error: Error ) => {
    console.log('Source is not reachable!');
    dispatch(setError(error));
  });
};
