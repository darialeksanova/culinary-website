import RecipePreviewComponent from 'components/RecipePreviewComponent';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipesContainerComponent.module.css';

type Props = {
  recipes: Array<RecipePreview & { isFavourite: boolean }>;
};

const RecipesContainerComponent = ({ recipes }: Props) => {
  return (
    <div className={styles.recipesContainer}>
      <ul className={styles.recipesList}>
        {recipes.map(recipe => <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={recipe.isFavourite}/>)}
      </ul>
    </div>
  );
};

export default RecipesContainerComponent;