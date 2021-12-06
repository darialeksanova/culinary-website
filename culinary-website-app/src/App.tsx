import { useEffect } from 'react';
import './App.module.css';
import styles from './App.module.css';
import HeaderComponent from 'components/HeaderComponent';
import MainPage from 'pages/MainPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoMatchPage from 'pages/NoMatchPage';
import MyRecipeBookPage from 'pages/MyRecipeBookPage';
import RecipePage from 'pages/RecipePage';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavouriteRecipesFromLocalStorage } from 'store/favouriteRecipes/actions';
import { RootState } from 'store/store';
import classNames from 'classnames/bind';
import { Theme } from 'types/theme';
import { setDarkTheme, setLightTheme } from 'store/theme/actions';

const cx = classNames.bind(styles);

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);


  useEffect(() => {
    dispatch(loadFavouriteRecipesFromLocalStorage());
  }, [dispatch]);

  const handleThemeSwitch = () => {
    if (theme === Theme.light) {
      dispatch(setDarkTheme());
    } else {
      dispatch(setLightTheme());
    }
  };

  return (
    <Router>
      <div className={cx({
          App: true,
          AppDark: theme === Theme.dark,
        })}>
        <HeaderComponent handleThemeSwitch={handleThemeSwitch}/>
        <div className={cx({
          main: true,
          mainDark: theme === Theme.dark,
        })}>
          <Routes>
            <Route path='/' element={<Navigate to='/recipes'></Navigate>}></Route>
            <Route path='/recipes' element={<MainPage />}></Route>
            <Route path='/recipes/:recipeId' element={<RecipePage />}></Route>
            <Route path='/my-recipe-book' element={<MyRecipeBookPage />}></Route>
            <Route path='*' element={<NoMatchPage />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
