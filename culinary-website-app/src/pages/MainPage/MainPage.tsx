import React from 'react';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <h1 className={styles.pageTitle}>Recipes</h1>
      <ul className={styles.recipesList}></ul>
      <div className={styles.actions}>
        <button className={styles.showMoreButton}>Show more</button>
      </div>
    </div>
  );
};

export default MainPage;