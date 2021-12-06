import LoaderComponent from 'components/LoaderComponent';
import SearchBarComponent from 'components/SearchBarComponent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import { SearchFilterValue } from 'types/searchFilterValue';
import styles from './MainPage.module.css';
import classNames from 'classnames/bind';
import { SearchParams } from 'types/searchParams';
import { clearSearchFilterValues } from 'store/searchFilterValues/actions';
import RecipesContainerComponent from 'components/RecipesContainerComponent';

const cx = classNames.bind(styles);
const RECIPES_TO_SHOW_DELTA = 10;
const RECIPES_TO_SHOW_INITIAL = '10';

const MainPage = () => {
  const recipesPreviewsList = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const areRecipePreviewsLoading = useSelector((state: RootState) => state.recipesPreviews.isLoading);
  const searchFilterValues = useSelector((state: RootState) => state.filterValues);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchBarValue, setSearchBarValue] = useState('');

  const query = useMemo(() => new URLSearchParams(location.search), [location]);

  const getSearchParamsFromURL = useCallback((query: URLSearchParams): SearchParams => {
    const searchInput = query.get('searchInput') || '';
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL;
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

  useEffect(() => {
    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
  }, [dispatch, query, getSearchParamsFromURL]);

  const handleSearchBarValueChange = useCallback((newValue: string) => {
    setSearchBarValue(newValue);
  }, []);

  const composeStringFromFilters = useCallback((filters: SearchFilterValue): string => {
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

  const updatePageURL = useCallback((query: URLSearchParams) => {
    navigate(`${location.pathname}?${query.toString()}`);
  }, [location, navigate]);

  const searchRecipes = useCallback((searchBarValue: string) => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL;
    const filtersAsString = composeStringFromFilters(searchFilterValues);

    query.set('totalRecipes', totalRecipes);

    if (filtersAsString !== '') {
      query.set('filters', composeStringFromFilters(searchFilterValues));
    }

    if (searchBarValue !== '') {
      query.set('searchInput', searchBarValue);
    }

    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    updatePageURL(query);
  }, [dispatch, searchFilterValues, location, composeStringFromFilters, updatePageURL, getSearchParamsFromURL]);


  const handleShowMoreButtonClick = useCallback(() => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL;
    const newTotalRecipes = parseInt(totalRecipes, 10) + RECIPES_TO_SHOW_DELTA;

    query.set('totalRecipes', newTotalRecipes.toString());

    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    updatePageURL(query);
  }, [dispatch, getSearchParamsFromURL, location, updatePageURL]);

  const handleResetButtonClick = useCallback(() => {
    const query = new URLSearchParams();
    dispatch(loadRecipesPreviews(getSearchParamsFromURL(query)));
    dispatch(clearSearchFilterValues());
    updatePageURL(query);
  }, [dispatch, getSearchParamsFromURL, updatePageURL]);

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
            <RecipesContainerComponent searchBarValue={searchBarValue} />
            <div className={styles.mainPageActions}>
              <button className={cx({
                showMoreButton: true,
                showMoreButtonHidden: recipesPreviewsList.length === 0 && searchBarValue !== '',
                })} 
                onClick={handleShowMoreButtonClick}
              >
                Show more
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
