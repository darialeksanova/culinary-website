import styles from './LoaderComponent.module.css';

const LoaderComponent = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.ldsSpinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoaderComponent;