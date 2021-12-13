import styles from './HeaderComponent.module.css';
import logo from 'assets/logo.png';
import { NavLink } from 'react-router-dom';
import sun from 'assets/sun.png';
import moon from 'assets/moon.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Theme } from 'types/theme';
import { setDarkTheme, setLightTheme } from 'store/theme/actions';

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector(( state: RootState ) => state.theme.theme);

  const handleThemeSwitch = (): void => {
    if (theme === Theme.light) {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt='logo'></img>
      </div>

      <ul className={styles.navigation}>
        <li>
          <NavLink 
            end 
            to='/recipes' 
            className={({ isActive }) => `${styles.navigationLink} ${isActive ? styles.activeLink : ''}`}
          >Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            end 
            to='/my-recipe-book' 
            className={({ isActive }) => `${styles.navigationLink} ${isActive ? styles.activeLink : ''}`}
          >My recipe book
          </NavLink>
        </li>
      </ul>

      <div className={styles.headerActions}>
        {theme === Theme.light &&
          <div className={styles.themeSwitchButton} onClick={handleThemeSwitch}>
            <img className={styles.themeIcon} src={moon} alt='dark'></img>
          </div>
        }
        {theme === Theme.dark &&
          <div className={styles.themeSwitchButton} onClick={handleThemeSwitch}>
            <img className={styles.themeIcon} src={sun} alt='light'></img>
          </div>
        }
      </div>
    </header>
  );
};

export default HeaderComponent;