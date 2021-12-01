import Loader from 'components/Loader';
import RecipePreviewComponent from 'components/RecipePreviewComponent/RecipePreviewComponent';
import SearchBarComponent from 'components/SearchBarComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import styles from './MainPage.module.css';

const MainPage = () => {
  const recipePreviewItems = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const favouriteRecipesList = useSelector((state: RootState) => state.favouriteRecipes.favouriteRecipes);
  const areRecipePreviewsLoaded = useSelector((state: RootState) => state.recipesPreviews.isLoaded);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const totalRecipes = query.get('totalRecipes') || '5';

  const [visibleRecipesAmount, setVisibleRecipesAmount] = useState(Number(totalRecipes));

  useEffect(() => {
    dispatch(loadRecipesPreviews());
  }, [dispatch]);

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
            <SearchBarComponent />
            <h1 className={styles.mainPageTitle}>Recipes</h1>
            <ul className={styles.recipesList}>
              {recipePreviewItems.slice(0, visibleRecipesAmount).map(recipe =>
                favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
                <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
                <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
              )}
            </ul>
            <div className={styles.mainPageActions}>
              <button className={styles.showMoreButton} onClick={handleShowMoreButtonClick}>Show more</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default MainPage;
