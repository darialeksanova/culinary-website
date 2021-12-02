import Loader from 'components/Loader';
import RecipePreviewComponent from 'components/RecipePreviewComponent/RecipePreviewComponent';
import SearchBarComponent from 'components/SearchBarComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import { RecipePreview } from 'types/recipePreview';
import styles from './MainPage.module.css';
import classNames from 'classnames/bind';
import { API_URL, API_KEY } from 'constants/index';

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
  const [searchResults, setSearchResults] = useState<RecipePreview[] | null>(null);

  useEffect(() => {
    dispatch(loadRecipesPreviews());
  }, [dispatch]);

  const handleSearchBarValueChange = (newValue: string) => {
    setSearchBarValue(newValue);
  };

  const searchRecipes = (searchBarValue: string) => {
    const recipesSearchedByTitle = recipesPreviewsList.filter(recipe => recipe.title.toLowerCase().includes(searchBarValue.toLowerCase()));
    let recipesSearchedByIngredients: RecipePreview[]; 
    fetch(`${API_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${searchBarValue}`)
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        throw new Error('Error on dish ingredients fetch!');
      })
      .then(recipesFound => {
        recipesSearchedByIngredients = recipesFound;
        console.log(recipesSearchedByIngredients)
        setSearchResults([...recipesSearchedByTitle, ...recipesSearchedByIngredients]);
      })
      .catch((error: Error) => {
        console.log('Unable to search by ingredients!', error);
        setSearchResults(recipesSearchedByTitle);
      });
  };

  const handleShowMoreButtonClick = () => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || '5';
    const newTotalRecipes = parseInt(totalRecipes, 10) + 5;
    query.set('totalRecipes', newTotalRecipes.toString());

    navigate(`${location.pathname}?${query.toString()}`);

    setVisibleRecipesAmount(prevState => prevState + 5);
  };

  return (
    <>
      {!areRecipePreviewsLoaded ? 
        <Loader /> : (
          <div className={styles.mainPageContainer}>
            <SearchBarComponent searchBarValue={searchBarValue} onSearchBarValueChange={handleSearchBarValueChange} onSearchSubmitButtonClick={searchRecipes}/>
            <h1 className={styles.mainPageTitle}>Recipes</h1>
            <ul className={styles.recipesList}>
              {((searchResults === null) || searchBarValue === '') && (
                recipesPreviewsList.slice(0, visibleRecipesAmount).map(recipe =>
                  favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
                )
              )}
              {(searchResults !== null && searchResults.length !== 0) && (
                searchResults.slice(0, visibleRecipesAmount).map(recipe =>
                  favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
                  <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
                )
              )}
              {(searchResults !== null && searchResults.length === 0 && searchBarValue !== '') && 
                <h2 className={styles.noResultsTitle}>No results found!</h2>
              }
            </ul>
            <div className={styles.mainPageActions}>
              <button className={cx({
                showMoreButton: true,
                showMoreButtonHidden: searchResults !== null && searchResults.length === 0 && searchBarValue !== '',
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
