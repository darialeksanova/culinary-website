import LoaderComponent from 'components/LoaderComponent';
import SearchBarComponent from 'components/SearchBarComponent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import { SearchFilterValue } from 'types/searchFilterValue';
import styles from './MainPage.module.css';
import { SearchParams } from 'types/searchParams';
import { clearSearchFilterValues, setSearchFilterValues } from 'store/searchFilterValues/actions';
import RecipesContainerComponent from 'components/RecipesContainerComponent';
import { RECIPES_TO_SHOW_INITIAL, RECIPES_TO_SHOW_DELTA } from 'constants/index';
import { RecipePreview } from 'types/recipePreview';
import UniversalButtonComponent from 'components/UniversalButtonComponent';

const MainPage = () => {
  const recipesPreviews = useSelector(( state: RootState ) => state.recipesPreviews.recipesPreviews);
  const favouriteRecipes = useSelector(( state: RootState ) => state.favouriteRecipes.favouriteRecipes);
  const areRecipePreviewsLoading = useSelector(( state: RootState ) => state.recipesPreviews.isLoading);
  const searchFilterValues = useSelector(( state: RootState ) => state.filterValues);
  const searchResultsTotalAmount = useSelector(( state: RootState ) => state.recipesPreviews.searchResultsTotalAmount);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchBarValue, setSearchBarValue] = useState('');

  const query = useMemo(() => new URLSearchParams(location.search), [ location ]);

  // create object needed to dispatch loadRecipesPreviews action
  const getSearchParamsFromURL = useCallback(( query: URLSearchParams ): SearchParams => {
    const searchInput = query.get('searchInput') || '';
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL.toString();
    const filtersAsString = query.get('filters') || '';
    const filtersAsArray = filtersAsString.split(',');
    const filtersAsObj: SearchFilterValue = {
      isVegetarian: filtersAsArray.includes('vegetarian'),
      isVegan: filtersAsArray.includes('vegan'),
      isGlutenFree: filtersAsArray.includes('glutenFree'),
      isDairyFree: filtersAsArray.includes('dairyFree'),
    };

    return {
      searchInput,
      totalRecipes: Number(totalRecipes),
      filters: filtersAsObj,
    };
  }, []);

  // make search values set by user stay after page is reloaded
  useEffect(() => {
    const searchParams = getSearchParamsFromURL(query);
    dispatch(loadRecipesPreviews(searchParams));
    dispatch(setSearchFilterValues(searchParams.filters));
    setSearchBarValue(searchParams.searchInput);
  }, [ dispatch, query, getSearchParamsFromURL ]);

  const handleSearchBarValueChange = useCallback(( newValue: string ): void => {
    setSearchBarValue(newValue);
  }, []);

  // create string with filter values needed to be set in URLSearchParams to search recipes
  const composeStringFromFilters = useCallback(( filters: SearchFilterValue ): string => {
    const filtersAsArray = [];

    if (filters.isDairyFree) {
      filtersAsArray.push('dairyFree');
    }

    if (filters.isGlutenFree) {
      filtersAsArray.push('glutenFree');
    }  

    if (filters.isVegetarian) {
      filtersAsArray.push('vegetarian');
    } 

    if (filters.isVegan) {
      filtersAsArray.push('vegan');
    }

    return filtersAsArray.join(',');
  }, []);

  // update page url after each search or reset click
  const updatePageURL = useCallback(( query: URLSearchParams ): void => {
    navigate(`${location.pathname}?${query.toString()}`);
  }, [ location, navigate ]);

  const searchRecipes = useCallback(( searchBarValue: string ): void => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL.toString();
    const filtersAsString = composeStringFromFilters(searchFilterValues);

    query.set('totalRecipes', totalRecipes);

    if (filtersAsString !== '') {
      query.set('filters', filtersAsString);
    } else {
      query.delete('filters');
    }

    if (searchBarValue !== '') {
      query.set('searchInput', searchBarValue);
    } else {
      query.delete('searchInput');
    }

    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    updatePageURL(query);
  }, [ dispatch, searchFilterValues, location, composeStringFromFilters, updatePageURL, getSearchParamsFromURL ]);


  const handleShowMoreButtonClick = useCallback((): void => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL.toString();
    const newTotalRecipes = parseInt(totalRecipes, 10) + RECIPES_TO_SHOW_DELTA;

    query.set('totalRecipes', newTotalRecipes.toString());

    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    updatePageURL(query);
  }, [ dispatch, getSearchParamsFromURL, location, updatePageURL ]);

  const handleResetButtonClick = useCallback((): void => {
    const query = new URLSearchParams();
    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    dispatch(clearSearchFilterValues());
    updatePageURL(query);
  }, [ dispatch, getSearchParamsFromURL, updatePageURL ]);

  const mergeRecipesWithFavouriteRecipes = useCallback((recipes: RecipePreview[], favouriteRecipes: RecipePreview[]) => {
    return recipes.map(recipe => ({
      ...recipe,
      isFavourite: !!favouriteRecipes.find(favouriteRecipe => favouriteRecipe.id === recipe.id),
    }));
  }, []);

  return (
    <>
      <div className={styles.mainPageContainer}>
        <SearchBarComponent 
          searchBarValue={searchBarValue} 
          onSearchBarValueChange={handleSearchBarValueChange} 
          onSearchSubmitButtonClick={searchRecipes}
          onResetButtonClick={handleResetButtonClick}
        />

        <h1 className={styles.mainPageTitle}>Recipes</h1>

        {areRecipePreviewsLoading ? 
          <LoaderComponent /> : (
          <>
            {(recipesPreviews.length !== 0) &&
              <RecipesContainerComponent 
                recipesToShow={mergeRecipesWithFavouriteRecipes(recipesPreviews, favouriteRecipes)} 
                totalResults={searchResultsTotalAmount} 
              />
            }

            {(recipesPreviews.length === 0 && searchBarValue !== '') && 
              <h2 className={styles.noResultsTitle}>No recipes found!</h2>
            }

            <div className={styles.mainPageActions}>
              {(searchResultsTotalAmount !== 0 && searchResultsTotalAmount > recipesPreviews.length) && (
                <UniversalButtonComponent 
                  text='Show more' 
                  size='medium' 
                  weight='bold'
                  onClick={handleShowMoreButtonClick} 
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;