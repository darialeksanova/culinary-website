import RecipePreviewComponent from 'components/RecipePreviewComponent/RecipePreviewComponent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipesPreviews } from 'store/recipesPreviews/actions';
import { RootState } from 'store/store';
import styles from './MainPage.module.css';

const MainPage = () => {
  const recipePreviewItems = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecipesPreviews());
  }, [dispatch]);

  return (
    <div className={styles.mainPage}>
      <h1 className={styles.mainPageTitle}>Recipes</h1>
      <ul className={styles.recipesList}>
        {recipePreviewItems.map(item => <RecipePreviewComponent key={item.id} recipePreview={item} />)}
      </ul>
      <div className={styles.mainPageActions}>
        <button className={styles.showMoreButton}>Show more</button>
      </div>
    </div>
  );
};

export default MainPage;
