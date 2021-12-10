import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import styles from './UniversalButtonComponent.module.css';
import classNames from 'classnames/bind';
import { Theme } from 'types/theme';

type Props = {
  text: string;
  size: 'small' | 'medium' | 'large';
  weight: 'regular' | 'bold';
  onClick?: () => void;
};

const cx = classNames.bind(styles);

const UniversalButtonComponent = ({ text, size, weight, onClick }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button 
      className={cx({
        button: true,
        buttonDark: theme === Theme.dark,
      }, size, weight)} 
      onClick={onClick}>{text}</button>
  );
};

export default UniversalButtonComponent;