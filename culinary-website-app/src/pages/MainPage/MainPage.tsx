import React from 'react';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <h1 className={styles.pageTitle}>Рецепты</h1>
      <ul className={styles.recipesList}></ul>
      <div className={styles.actions}>
        <button className={styles.showMoreButton}>Показать еще</button>
      </div>
    </div>
  );
};

export default MainPage;