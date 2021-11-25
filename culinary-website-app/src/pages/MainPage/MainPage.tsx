import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipesPreviews } from 'store/recipes/actions';
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
      <h1 className={styles.pageTitle}>Recipes</h1>
      <ul className={styles.recipesList}>
        {/* {recipePreviewItems.map(item => item.title)} */}
      </ul>
      <div className={styles.actions}>
        <button className={styles.showMoreButton}>Show more</button>
      </div>
    </div>
  );
};

export default MainPage;
