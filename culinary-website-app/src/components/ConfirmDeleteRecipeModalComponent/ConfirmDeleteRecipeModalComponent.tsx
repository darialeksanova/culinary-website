import styles from './ConfirmDeleteRecipeModalComponent.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  recipeTitle: string;
};

const ConfirmDeleteRecipeModalComponent = ({ recipeTitle }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal}>
        <h4 className={styles.modalTitle}>Are you sure to delete "{recipeTitle}" recipe from your recipe book?</h4>
        <div className={styles.modalActions}>
          <button 
            className={cx({
              confirmDeleteModalButton: true,
              noButton: true,
            })}
            >No
          </button>
          <button 
            className={cx({
              confirmDeleteModalButton: true,
              yesButton: true,
            })}
            >Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteRecipeModalComponent;