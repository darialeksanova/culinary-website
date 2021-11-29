import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;