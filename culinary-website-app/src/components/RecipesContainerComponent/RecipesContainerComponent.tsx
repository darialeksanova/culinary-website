import RecipePreviewComponent from 'components/RecipePreviewComponent';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipesContainerComponent.module.css';

type Props = {
  recipesToShow: Array<RecipePreview & { isFavourite: boolean }>;
  totalResults: number;
};

const RecipesContainerComponent = ({ recipesToShow, totalResults }: Props) => {
  return (
    <div className={styles.recipesContainer}>
      <h5 className={styles.totalResultsTitle}>Total: {totalResults} recipes</h5>
      <ul className={styles.recipesList}>
        {recipesToShow
          .map(recipe => 
            <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={recipe.isFavourite}/>
          )
        }
      </ul>
    </div>
  );
};

export default RecipesContainerComponent;