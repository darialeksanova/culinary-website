import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addRecipeToFavourites, deleteRecipeFromFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipePreviewComponent.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  recipePreview: RecipePreview;
  isFavourite: boolean;
};

const RecipePreviewComponent = ({ recipePreview, isFavourite }: Props) => {
  const dispatch = useDispatch();

  const handleAddToMyRecipeBookButtonClick = () => {
    dispatch(addRecipeToFavourites(recipePreview));
  };

  const handleDeleteFromMyRecipeBookButtonClick = () => {
    dispatch(deleteRecipeFromFavourites(recipePreview));
  };

  return (
    <div className={styles.recipePreviewContainer}>
      <div className={styles.recipeImageContainer}>
        <img className={styles.recipeImage} src={recipePreview.image} alt='dish'></img>
      </div>
      <div className={styles.recipeContent}>
          <h3 className={styles.recipeTitle}>{recipePreview.title}</h3>
          <div className={styles.recipeActions}>
            {!isFavourite && 
              <button 
                className={cx({
                  recipePreviewComponentButton: true,
                  addToFavouritesButton: true,
                })} 
                onClick={handleAddToMyRecipeBookButtonClick}
              >Add to my recipe book
              </button>
            }
            {isFavourite && 
              <button 
                className={cx({
                  recipePreviewComponentButton: true,
                  deleteFromFavouritesButton: true,
                })} 
                onClick={handleDeleteFromMyRecipeBookButtonClick}
              >Delete from my recipe book
              </button>
            }
            <NavLink to={`/recipes/${recipePreview.id}`} className={styles.recipeDetailsLink}>
              <button className={styles.recipePreviewComponentButton}>How to cook?</button>
            </NavLink>
          </div>
        </div>
    </div>
  );
};

export default RecipePreviewComponent;