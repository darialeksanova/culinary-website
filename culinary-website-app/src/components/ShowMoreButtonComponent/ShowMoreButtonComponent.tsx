import styles from './ShowMoreButtonComponent.module.css';
import classNames from 'classnames/bind';

type Props = {
  recipesShownAmount: number;
  recipesTotalAmount: number;
  onClick: () => void;
};

const cx = classNames.bind(styles);

const ShowMoreButtonComponent = ({ onClick, recipesTotalAmount, recipesShownAmount }: Props) => {
  return (
    <button className={cx({
      showMoreButton: true,
      showMoreButtonHidden: recipesTotalAmount === 0 || recipesTotalAmount <= recipesShownAmount,
      })} 
      onClick={onClick}
    >Show more
    </button>
  );
};

export default ShowMoreButtonComponent;