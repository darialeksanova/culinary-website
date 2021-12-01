import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useState } from 'react';

const SearchBarComponent = () => {
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  return (
    <div className={styles.searchBarComponent}>
    <div className={styles.searchBarContainer}>
      <input className={styles.searchInput} type='text' placeholder='What do you want to cook today?'></input>
      <button className={styles.searchFilterButton} disabled={isSearchFilterOpen} onClick={() => setIsSearchFilterOpen(true)}>Filter</button>
      <button className={styles.searchSubmitButton}>Search</button>
    </div>
    {isSearchFilterOpen && (
      <>
        <SearchFilterComponent />
      </>
    )}
    </div>
  );
};

export default SearchBarComponent;