import styles from './NoMatchPage.module.css';

const NoMatchPage = () => {
  return (
    <div className={styles.noMatch}>
      <h1 className={styles.error}>404</h1>
      <h2 className={styles.message}>Oops! Page not found :c</h2>
    </div>
  );
};

export default NoMatchPage;