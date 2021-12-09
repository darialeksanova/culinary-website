import styles from './ConfirmDeleteRecipeModalComponent.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipeFromFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';
import { Theme } from 'types/theme';
import { RootState } from 'store/store';
import { useCallback } from 'react';
import UniversalButtonComponent from 'components/UniversalButtonComponent';

const cx = classNames.bind(styles);

type Props = {
  recipePreview: RecipePreview;
  closeModal: () => void;
};

const ConfirmDeleteRecipeModalComponent = ({ recipePreview, closeModal }: Props) => {
  const theme = useSelector(( state: RootState ) => state.theme.theme);
  const dispatch = useDispatch();

  const handleDeleteFromMyRecipeBookButtonClick = useCallback((): void => {
    dispatch(deleteRecipeFromFavourites(recipePreview));
    closeModal();
  }, [ closeModal, recipePreview, dispatch ]);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={cx({
        modal: true,
        modalDark: theme === Theme.dark,
      })}>

        <h4 className={styles.modalTitle}>
          Are you sure to delete "
            {recipePreview.title[0].toUpperCase()}{recipePreview.title.slice(1).toLowerCase()}
          " recipe from your recipe book?
        </h4>
        
        <div className={styles.modalActions}>
          <div className={cx({
            noButton: true,
            buttonDark: theme === Theme.dark,
          })}>
            <UniversalButtonComponent 
              text='No'
              size='small'
              weight='regular'
              onClick={closeModal}
            />
          </div>
          <div className={cx({
            yesButton: true,
            buttonDark: theme === Theme.dark,
          })}>
            <UniversalButtonComponent 
              text='Yes'
              size='small'
              weight='regular'
              onClick={handleDeleteFromMyRecipeBookButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteRecipeModalComponent;