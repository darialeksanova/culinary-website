import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useState } from 'react';

type Props = {
  searchBarValue: string;
  onSearchBarValueChange: (newValue: string) => void;
  onSearchSubmitButtonClick: (searchBarValue: string) => void;
};

const SearchBarComponent = ({ searchBarValue, onSearchBarValueChange, onSearchSubmitButtonClick }: Props) => {
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  return (
    <div className={styles.searchBarComponent}>
    <div className={styles.searchBarContainer}>
      <input 
        className={styles.searchInput} 
        type='text' 
        value={searchBarValue}
        placeholder='What do you want to cook today?' 
        onChange={(event) => onSearchBarValueChange(event.target.value)}
      >
      </input>
      <button 
        className={styles.searchFilterButton} 
        disabled={isSearchFilterOpen} 
        onClick={() => setIsSearchFilterOpen(true)}
      >
        Filter
      </button>
      <button className={styles.searchSubmitButton} onClick={() => onSearchSubmitButtonClick(searchBarValue)}>Search</button>
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