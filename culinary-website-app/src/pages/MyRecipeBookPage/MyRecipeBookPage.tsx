import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { RootState } from 'store/store';
import styles from './MyRecipeBookPage.module.css';
import { RECIPES_TO_SHOW_DELTA, RECIPES_TO_SHOW_INITIAL } from 'constants/index';
import RecipesContainerComponent from 'components/RecipesContainerComponent';
import { RecipePreview } from 'types/recipePreview';
import ShowMoreButtonComponent from 'components/ShowMoreButtonComponent';

const MyRecipeBookPage = () => {
  const favouriteRecipes = useSelector(( state: RootState ) => state.favouriteRecipes.favouriteRecipes);
  const favouriteRecipesTotalAmount = useSelector(( state: RootState ) => state.favouriteRecipes.favouriteRecipesTotalAmount);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL.toString();

  const [visibleRecipesAmount, setVisibleRecipesAmount] = useState(Number(totalRecipes));

  const handleShowMoreButtonClick = useCallback((): void => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || RECIPES_TO_SHOW_INITIAL.toString();
    const newTotalRecipes = parseInt(totalRecipes, 10) + RECIPES_TO_SHOW_DELTA;
    query.set('totalRecipes', newTotalRecipes.toString());

    navigate(`${location.pathname}?${query.toString()}`);

    setVisibleRecipesAmount(prevState => prevState + RECIPES_TO_SHOW_INITIAL);
  }, [location.pathname, location.search, navigate]);

  const addIsFavouriteFieldToEachRecipe = useCallback((favouriteRecipes: RecipePreview[]) => {
    return favouriteRecipes.map(recipe => ({...recipe, isFavourite: true}))
  }, []);

  return (
    <div className={styles.favouritesPageContainer}>
      <h1 className={styles.favouritesPageTitle}>Your Favourite Recipes</h1>

      <RecipesContainerComponent 
        recipesToShow={addIsFavouriteFieldToEachRecipe(favouriteRecipes.slice(0, visibleRecipesAmount))}
        totalResults={favouriteRecipesTotalAmount}
      />

      <div className={styles.favouritesPageActions}>
        <ShowMoreButtonComponent 
          onClick={handleShowMoreButtonClick} 
          recipesShownAmount={visibleRecipesAmount}
          recipesTotalAmount={favouriteRecipesTotalAmount} 
        />
      </div>
    </div>
  );
};

export default MyRecipeBookPage;