import { RecipePreview } from 'types/recipePreview';
import styles from './RecipePreviewComponent.module.css';

type Props = {
  recipePreview: RecipePreview;
};

const RecipePreviewComponent = ({ recipePreview }: Props) => {

  return (
    <div className={styles.recipePreviewContainer}>
      <div className={styles.recipeImageContainer}>
        <img className={styles.recipeImage} src={recipePreview.image} alt='dish'></img>
      </div>
      <div className={styles.recipeContent}>
          <h3 className={styles.recipeTitle}>{recipePreview.title}</h3>
          <div className={styles.recipeActions}>
            <button className={styles.addToFavouritesButton}>Add to my recipe book</button>
            <button className={styles.openRecipePageButton}>How to cook?</button>
          </div>
        </div>
    </div>
  );
};

export default RecipePreviewComponent;