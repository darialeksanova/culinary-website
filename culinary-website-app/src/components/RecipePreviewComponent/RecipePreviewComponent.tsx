import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addRecipeToFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import styles from './RecipePreviewComponent.module.css';
import { useCallback, useState } from 'react';
import ConfirmDeleteRecipeModalComponent from 'components/ConfirmDeleteRecipeModalComponent';
import UniversalButtonComponent from 'components/UniversalButtonComponent';
import classNames from 'classnames/bind';
import { RootState } from 'store/store';
import { Theme } from 'types/theme';

type Props = {
  recipePreview: RecipePreview;
  isFavourite: boolean;
};

const cx = classNames.bind(styles);

const RecipePreviewComponent = ({ recipePreview, isFavourite }: Props) => {
  const [isConfirmRecipeDeleteModalVisible, setIsConfirmRecipeDeleteModalVisible] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleAddToMyRecipeBookButtonClick = useCallback((): void => {
    dispatch(addRecipeToFavourites(recipePreview));
  }, [ dispatch, recipePreview ]);

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
            <h3 className={styles.recipeTitle}>
              {recipePreview.title[0].toUpperCase()}{recipePreview.title.slice(1).toLowerCase()}
            </h3>
            <div className={styles.recipeActions}>
              {!isFavourite && (
                <div className={cx({
                  addToRecipeBookButton: true,
                  buttonDark: theme === Theme.dark,
                })}>
                  <UniversalButtonComponent 
                    text='Add to recipe book'
                    size='medium'
                    weight='regular'
                    onClick={handleAddToMyRecipeBookButtonClick}
                  />
                </div>
              )}
              {isFavourite && (
                <div className={cx({
                  deleteFromRecipeBookButton: true,
                  buttonDark: theme === Theme.dark,
                })}>
                  <UniversalButtonComponent 
                    text='Delete from recipe book'
                    size='medium'
                    weight='regular'
                    onClick={openConfirmDeleteRecipeModal}
                  />
              </div>
              )}
              <NavLink to={`/recipes/${recipePreview.id}`} className={styles.recipeDetailsLink}>
                <UniversalButtonComponent 
                  text='How to cook?'
                  size='small'
                  weight='regular'
                />
              </NavLink>
            </div>
          </div>
      </div>
    </>
  );
};

export default RecipePreviewComponent;