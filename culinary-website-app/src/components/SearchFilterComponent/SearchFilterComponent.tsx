import styles from './SearchFilterComponent.module.css';

const SearchFilterComponent = () => {
  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} id='dairyFree' type='checkbox' value='dairy-free'></input>
        <label htmlFor='dairyFree'>Dairy free</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='gluten-free'></input>
        <label htmlFor='glutenFree'>Gluten free</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='vegetarian'></input>
        <label htmlFor='vegetarian'>Vegetarian</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='vegan'></input>
        <label htmlFor='vegan'>Vegan</label>
      </div>
    </div>
  );
};

export default SearchFilterComponent;