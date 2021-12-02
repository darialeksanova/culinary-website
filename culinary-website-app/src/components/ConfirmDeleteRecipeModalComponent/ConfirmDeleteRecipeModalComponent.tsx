import styles from './ConfirmDeleteRecipeModalComponent.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipeFromFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import { Theme } from 'types/theme';
import { RootState } from 'store/store';
import MyRecipeBookButton from 'components/MyRecipeBookButton/MyRecipeBookButton';
import { useCallback } from 'react';

const cx = classNames.bind(styles);

type Props = {
  recipePreview: RecipePreview;
  closeModal: () => void;
};

const ConfirmDeleteRecipeModalComponent = ({ recipePreview, closeModal }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const handleDeleteFromMyRecipeBookButtonClick = useCallback(() => {
    dispatch(deleteRecipeFromFavourites(recipePreview));
    closeModal();
  }, [closeModal, recipePreview, dispatch]);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={cx({
        modal: true,
        dark: theme === Theme.dark,
      })}>
        <h4 className={styles.modalTitle}>Are you sure to delete "{recipePreview.title}" recipe from your recipe book?</h4>
        <div className={styles.modalActions}>
          <MyRecipeBookButton 
            text='No' 
            purpose='noButton' 
            onClick={closeModal} 
          />
          <MyRecipeBookButton 
            text='Yes' 
            purpose='yesButton' 
            onClick={handleDeleteFromMyRecipeBookButtonClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteRecipeModalComponent;