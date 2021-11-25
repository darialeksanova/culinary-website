import React from 'react';
import './App.module.css';
import styles from './App.module.css';
import Header from 'components/Header';
import MainPage from 'pages/MainPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoMatchPage from 'pages/NoMatchPage';
import MyRecipeBookPage from 'pages/MyRecipeBookPage';
import RecipePage from 'pages/RecipePage';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <div className={styles.main}>
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
