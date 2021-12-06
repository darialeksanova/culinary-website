import styles from './MyRecipeBookButtonComponent.module.css';
import classNames from 'classnames/bind';
import { Theme } from 'types/theme';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const cx = classNames.bind(styles);

type Props = {
  onClick: () => void;
  text: string;
  purpose: 'addButton' | 'deleteButton' | 'noButton' | 'yesButton';
  icon?: string;
  specialButton?: boolean;
};

const MyRecipeBookButtonComponent = ({ onClick, text, purpose, icon, specialButton }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button 
      className={cx({
        favouritesButton: true,
        darkButton: theme === Theme.dark,
        specialButton: specialButton,
      }, purpose)} 
      onClick={onClick}
    > 
      {icon && (
        <div className={styles.favouritesIconContainer}>
          <img className={styles.favouritesIcon} src={icon} alt={purpose}></img>
        </div>
      )}
      {text}
    </button>
  );
};

export default MyRecipeBookButtonComponent;