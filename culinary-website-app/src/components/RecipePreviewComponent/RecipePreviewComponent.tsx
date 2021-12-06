import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addRecipeToFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipePreviewComponent.module.css';
import { useCallback, useState } from 'react';
import ConfirmDeleteRecipeModalComponent from 'components/ConfirmDeleteRecipeModalComponent';
import MyRecipeBookButtonComponent from 'components/MyRecipeBookButtonComponent';


type Props = {
  recipePreview: RecipePreview;
  isFavourite: boolean;
};

const RecipePreviewComponent = ({ recipePreview, isFavourite }: Props) => {
  const [isConfirmRecipeDeleteModalVisible, setIsConfirmRecipeDeleteModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAddToMyRecipeBookButtonClick = useCallback((): void => {
    dispatch(addRecipeToFavourites(recipePreview));
  }, [dispatch, recipePreview]);

  const openConfirmDeleteRecipeModal = useCallback((): void => {
    setIsConfirmRecipeDeleteModalVisible(true);
  }, []);

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
            <h3 className={styles.recipeTitle}>{recipePreview.title[0].toUpperCase()}{recipePreview.title.slice(1).toLowerCase()}</h3>
            <div className={styles.recipeActions}>
              {!isFavourite && 
                <MyRecipeBookButtonComponent 
                  text='Add to my recipe book' 
                  purpose='addButton' 
                  onClick={handleAddToMyRecipeBookButtonClick} 
                />
              }
              {isFavourite && 
                <MyRecipeBookButtonComponent 
                  text='Delete from my recipe book'
                  purpose='deleteButton'
                  onClick={openConfirmDeleteRecipeModal}
                />
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