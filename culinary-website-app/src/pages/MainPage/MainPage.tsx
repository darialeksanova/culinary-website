import Loader from 'components/Loader';
import RecipePreviewComponent from 'components/RecipePreviewComponent/RecipePreviewComponent';
import SearchBarComponent from 'components/SearchBarComponent';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import { RecipePreview } from 'types/recipePreview';
import { SearchFilterValues } from 'types/searchFilter';
import styles from './MainPage.module.css';
import classNames from 'classnames/bind';
import { API_URL, API_KEY } from 'constants/index';
import { PaginatedSearchResults } from 'types/paginatedSearchResults';

const cx = classNames.bind(styles);

const MainPage = () => {
  const recipesPreviewsList = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const favouriteRecipesList = useSelector((state: RootState) => state.favouriteRecipes.favouriteRecipes);
  const areRecipePreviewsLoaded = useSelector((state: RootState) => state.recipesPreviews.isLoaded);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const totalRecipes = query.get('totalRecipes') || '5';

  const [visibleRecipesAmount, setVisibleRecipesAmount] = useState(Number(totalRecipes));
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchResults, setSearchResults] = useState<RecipePreview[]>([]);
  const [searchFilterValues, setSearchFilterValues] = useState<SearchFilterValues>({
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isDairyFree: false,
  });

  useEffect(() => {
    dispatch(loadRecipesPreviews());
  }, [dispatch]);

  const handleSearchBarValueChange = useCallback((newValue: string) => {
    setSearchBarValue(newValue);
  }, []);

  const getDietFilterValues = (searchFilterValues: SearchFilterValues): string[] => {
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

  const composeURLSearchParams = useCallback((searchFilterValues: SearchFilterValues, searchBarValue: string) => {
    const dietFilterValues = getDietFilterValues(searchFilterValues);
    const complexSearchURLParams: { [key: string]: string } = {
      apiKey: API_KEY,
      number: '100',
    };

    if (dietFilterValues.length !== 0) {
      complexSearchURLParams.diet = dietFilterValues.join(',');
    }

    if (searchFilterValues.isDairyFree) {
      complexSearchURLParams.intolerances = 'Dairy';
    }

    if (searchBarValue !== '') {
      complexSearchURLParams.titleMatch = searchBarValue.toLowerCase();
    }

    return Object.entries(complexSearchURLParams).map(([paramKey, paramValue]) => `${paramKey}=${paramValue}`).join('&');
  }, []);

  const searchRecipes = useCallback((searchBarValue: string) => {
    Promise.all([
      fetch(`${API_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchBarValue}&number=100`)
        .then(response => {
          if(response.ok) {
            return response.json() as Promise<RecipePreview[]>;
          }

          throw new Error('Error on dish ingredients fetch!');
        }),
      fetch(`${API_URL}/recipes/complexSearch?${composeURLSearchParams(searchFilterValues, searchBarValue)}`)
        .then(response => {
          if(response.ok) {
            return response.json() as Promise<PaginatedSearchResults<RecipePreview>>;
          }

          throw new Error('Error on dish ingredients fetch!');
        }), 
      ])
        .then(([ foundByIngredients, foundByOtherConditions ]) => {
          let searchResult = [...foundByOtherConditions.results];

          if (foundByIngredients.length !== 0) {
            searchResult = foundByOtherConditions.results.filter(recipePreview => foundByIngredients.find((recipe) => recipe.id === recipePreview.id));
          }

          setSearchResults(searchResult);
        })
        .catch((error: Error) => {
          console.log('Unable to search with filters!', { error });
          setSearchResults([]);
        });
  }, [searchFilterValues, composeURLSearchParams]);

  const handleShowMoreButtonClick = useCallback(() => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || '5';
    const newTotalRecipes = parseInt(totalRecipes, 10) + 5;
    query.set('totalRecipes', newTotalRecipes.toString());

    navigate(`${location.pathname}?${query.toString()}`);

    setVisibleRecipesAmount(prevState => prevState + 5);
  }, [location.pathname, location.search, navigate]);

  return (
    <>
      {!areRecipePreviewsLoaded ? 
        <Loader /> : (
          <div className={styles.mainPageContainer}>
            <SearchBarComponent 
              searchBarValue={searchBarValue} 
              searchFilterValues={searchFilterValues}
              setSearchFilterValues={setSearchFilterValues}
              onSearchBarValueChange={handleSearchBarValueChange} 
              onSearchSubmitButtonClick={searchRecipes}
            />
            <h1 className={styles.mainPageTitle}>Recipes</h1>
            <ul className={styles.recipesList}>
              {(searchBarValue === '' && searchResults.length === 0) && (
                recipesPreviewsList.slice(0, visibleRecipesAmount).map(recipe =>
                  favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
                )
              )}
              {(searchResults.length !== 0) && (
                searchResults.slice(0, visibleRecipesAmount).map(recipe =>
                  favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
                )
              )}
              {(searchResults.length === 0 && searchBarValue !== '') && 
                <h2 className={styles.noResultsTitle}>No results found!</h2>
              }
            </ul>
            <div className={styles.mainPageActions}>
              <button className={cx({
                showMoreButton: true,
                showMoreButtonHidden: searchResults.length === 0 && searchBarValue !== '',
                })} 
                onClick={handleShowMoreButtonClick}
              >
                Show more
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default MainPage;
