import React from 'react';
import styles from './NoMatchPage.module.css';

const NoMatch = () => {
  return (
    <div className={styles.noMatch}>
      <h1 className={styles.error}>404</h1>
      <h2 className={styles.message}>Oops! Page not found :c</h2>
    </div>
  );
};

export default NoMatch;