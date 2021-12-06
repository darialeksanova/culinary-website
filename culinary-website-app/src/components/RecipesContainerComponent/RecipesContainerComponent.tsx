import RecipePreviewComponent from 'components/RecipePreviewComponent';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import styles from './RecipesContainerComponent.module.css';

type Props = {
  searchBarValue: string;
};

const RecipesContainerComponent = ({ searchBarValue }: Props) => {
  const recipesPreviewsList = useSelector((state: RootState) => state.recipesPreviews.recipesPreviews);
  const favouriteRecipesList = useSelector((state: RootState) => state.favouriteRecipes.favouriteRecipes);

  return (
    <div className={styles.recipesContainer}>
      <ul className={styles.recipesList}>
        {recipesPreviewsList.map(recipe =>
          favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === recipe.id) ?
          <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={true}/> :
          <RecipePreviewComponent key={recipe.id} recipePreview={recipe} isFavourite={false}/>
        )}
        {(recipesPreviewsList.length === 0 && searchBarValue !== '') && 
          <h2 className={styles.noResultsTitle}>No results found!</h2>
        }
      </ul>
    </div>
  );
};

export default RecipesContainerComponent;