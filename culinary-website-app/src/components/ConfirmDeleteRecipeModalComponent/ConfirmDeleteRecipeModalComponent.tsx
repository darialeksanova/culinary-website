import styles from './ConfirmDeleteRecipeModalComponent.module.css';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { deleteRecipeFromFavourites } from 'store/favouriteRecipes/actions';
import { RecipePreview } from 'types/recipePreview';

const cx = classNames.bind(styles);

type Props = {
  recipePreview: RecipePreview;
  closeModal: () => void;
};

const ConfirmDeleteRecipeModalComponent = ({ recipePreview, closeModal }: Props) => {
  const dispatch = useDispatch();

  const handleDeleteFromMyRecipeBookButtonClick = () => {
    dispatch(deleteRecipeFromFavourites(recipePreview));
    closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h4 className={styles.modalTitle}>Are you sure to delete "{recipePreview.title}" recipe from your recipe book?</h4>
        <div className={styles.modalActions}>
          <button 
            className={cx({
              confirmDeleteModalButton: true,
              noButton: true,
            })}
            onClick={closeModal}
            >No
          </button>
          <button 
            className={cx({
              confirmDeleteModalButton: true,
              yesButton: true,
            })}
            onClick={handleDeleteFromMyRecipeBookButtonClick}
            >Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteRecipeModalComponent;