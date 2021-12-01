import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useState } from 'react';

const SearchBarComponent = () => {
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  return (
    <div className={styles.searchBarContainer}>
      <input className={styles.searchInput} type='text' placeholder='What do you want to cook today?'></input>
      {!isSearchFilterOpen && 
        <button className={styles.searchFilterButton} onClick={() => setIsSearchFilterOpen(true)}>Filter</button>
      }
      {isSearchFilterOpen && 
        <SearchFilterComponent />
      }
      <button className={styles.searchSubmitButton}>Search</button>
    </div>
  );
};

export default SearchBarComponent;