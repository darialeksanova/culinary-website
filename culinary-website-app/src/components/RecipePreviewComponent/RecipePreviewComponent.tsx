import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addRecipeToFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipePreviewComponent.module.css';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ConfirmDeleteRecipeModalComponent from 'components/ConfirmDeleteRecipeModalComponent';

const cx = classNames.bind(styles);

type Props = {
  recipePreview: RecipePreview;
  isFavourite: boolean;
};

const RecipePreviewComponent = ({ recipePreview, isFavourite }: Props) => {
  const [isConfirmRecipeDeleteModalVisible, setIsConfirmRecipeDeleteModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddToMyRecipeBookButtonClick = () => {
    dispatch(addRecipeToFavourites(recipePreview));
  };

  const openConfirmDeleteRecipeModal = () => {
    setIsConfirmRecipeDeleteModalVisible(true);
  };

  return ( 
    <>
      {isConfirmRecipeDeleteModalVisible && 
        <ConfirmDeleteRecipeModalComponent 
          recipePreview={recipePreview} 
          closeModal={() => setIsConfirmRecipeDeleteModalVisible(false)}
        />
      }
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
                  onClick={openConfirmDeleteRecipeModal}
                >Delete from my recipe book
                </button>
              }
              <NavLink to={`/recipes/${recipePreview.id}`} className={styles.recipeDetailsLink}>
                <button className={styles.recipePreviewComponentButton}>How to cook?</button>
              </NavLink>
            </div>
          </div>
      </div>
    </>
  );
};

export default RecipePreviewComponent;