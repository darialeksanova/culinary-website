import RecipePreviewComponent from 'components/RecipePreviewComponent';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { RootState } from 'store/store';
import styles from './MyRecipeBookPage.module.css';

const MyRecipeBookPage = () => {
  const favouriteRecipesList = useSelector((state: RootState) => state.favouriteRecipes.favouriteRecipes);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const totalRecipes = query.get('totalRecipes') || '5';

  const [visibleRecipesAmount, setVisibleRecipesAmount] = useState(Number(totalRecipes));

  const handleShowMoreButtonClick = () => {
    const query = new URLSearchParams(location.search);
    const totalRecipes = query.get('totalRecipes') || '5';
    const newTotalRecipes = parseInt(totalRecipes, 10) + 5;
    query.set('totalRecipes', newTotalRecipes.toString());

    navigate(`${location.pathname}?${query.toString()}`);

    setVisibleRecipesAmount(prevState => prevState + 5);
  };

  return (
    <div className={styles.favouritesPageContainer}>
      <h1 className={styles.favouritesPageTitle}>Your Favourite Recipes</h1>
      <ul className={styles.favouritesList}>
        {favouriteRecipesList?.slice(0, visibleRecipesAmount).map(favouriteRecipe => <RecipePreviewComponent key={favouriteRecipe.id} recipePreview={favouriteRecipe} isFavourite={true}/>)}
      </ul>
      <div className={styles.favouritesPageActions}>
        <button className={styles.showMoreButton} onClick={handleShowMoreButtonClick}>Show more</button>
      </div>
    </div>
  );
};

export default MyRecipeBookPage;