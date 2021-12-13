import { Dispatch } from "redux";
import { apiService } from "services/ApiService";
import { PaginatedSearchResults } from "types/paginatedSearchResults";
import { RecipePreview } from "types/recipePreview";
import { SearchFilterValue } from "types/searchFilterValue";
import { SearchParams } from "types/searchParams";
import { LoadRecipesPreviewsFailureAction, LoadRecipesPreviewsStartedAction, LoadRecipesPreviewsSuccessAction, RecipesPreviewsAction, SetRecipesPreviewsTotalAmountAction } from "./types";

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

const setRecipesPreviewsTotalAmount = ( totalAmount: number ): SetRecipesPreviewsTotalAmountAction => {
  return {
    type: RecipesPreviewsAction.SET_RECIPES_PREVIEWS_TOTAL_AMOUNT,
    payload: totalAmount,
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

// create string for complex search request
const composeURLSearchParams = ( searchParams: SearchParams ): string => {
  const dietFilterValues = getDietFilterValues(searchParams.filters);
  const complexSearchURLParams: { [key: string]: string } = {
    apiKey: apiService.getApiKey(),
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
  const apiUrl = apiService.getApiUrl();

  dispatch(startRecipesPreviewLoading());

  Promise.all([
    searchParams.searchInput === ''
      ? []
      : fetch(`${apiUrl}/recipes/findByIngredients?apiKey=${apiService.getApiKey()}&ingredients=${searchParams.searchInput}&number=100`)
        .then(response => {
          if(response.ok) {
            return response.json() as Promise<RecipePreview[]>;
          }

          throw new Error('Error on dish ingredients fetch!');
        }),
    fetch(`${apiUrl}/recipes/complexSearch?${composeURLSearchParams(searchParams)}&number=100`)
      .then(response => {
        if(response.ok) {
          return response.json() as Promise<PaginatedSearchResults<RecipePreview>>;
        }

        throw new Error('Error on recipe preview items fetch!');
      }),
  ])
  .then(([ searchByIngredientsResult, complexSearchResult ]) => {
    let searchResult = [ ...complexSearchResult.results ];

    if (searchParams.searchInput !== '') {
      searchResult = searchResult
        .filter(recipeFromComplexSearch => searchByIngredientsResult
          .find(recipeFromIngredientsSearch => recipeFromIngredientsSearch.id === recipeFromComplexSearch.id)
        );
      dispatch(setRecipesPreviewsTotalAmount(searchResult.length));
    } else {
      dispatch(setRecipesPreviewsTotalAmount(complexSearchResult.totalResults));
    }

    dispatch(setRecipesPreviews(searchResult.slice(0, searchParams.totalRecipes)));
  })
  .catch(( error: Error ) => {
    console.log('Source is not reachable!');
    dispatch(setError(error));
  });
};
